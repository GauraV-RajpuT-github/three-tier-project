import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import aiProfilePic from '../chillguy-photoaidcom-cropped.jpg';

// Animates 'Thinking...' one letter at a time, looping
const ThinkingAnimation = () => {
    const [visibleCount, setVisibleCount] = React.useState(0);
    const text = "Thinking...";
    React.useEffect(() => {
        const interval = setInterval(() => {
            setVisibleCount((prev) => (prev < text.length ? prev + 1 : 0));
        }, 120);
        return () => clearInterval(interval);
    }, []);
    return (
        <span style={{ fontWeight: 500, letterSpacing: 1 }}>{text.slice(0, visibleCount)}</span>
    );
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Send welcome message on first load and test API connection
    useEffect(() => {
        // Add welcome message
        setMessages([{
            sender: 'bot',
            text: "Aur bhai ? Kya haal hai? Ask me if you have any doubts."
        }]);
        
        // Test API connection
        const testApiConnection = async () => {
            try {
                console.log('Testing API connection...');
                // First try the simple test endpoint
                const testResponse = await fetch('http://localhost:5002/api/gemini/test', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (testResponse.ok) {
                    const testData = await testResponse.json();
                    console.log('Test endpoint response:', testData);
                    console.log('Backend connection successful!');
                    
                    // Now test the Gemini API endpoint
                    try {
                        const geminiResponse = await fetch('http://localhost:5002/api/gemini/ask', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ message: 'Test connection' })
                        });
                        
                        if (geminiResponse.ok) {
                            const geminiData = await geminiResponse.json();
                            console.log('Gemini API test successful!');
                            console.log('Gemini response:', geminiData);
                        } else {
                            console.error('Gemini API test failed with status:', geminiResponse.status);
                            const errorData = await geminiResponse.json();
                            console.error('Error details:', errorData);
                        }
                    } catch (geminiError) {
                        console.error('Gemini API test failed:', geminiError);
                    }
                } else {
                    console.error('Backend test failed with status:', testResponse.status);
                }
            } catch (error) {
                console.error('API connection test failed:', error);
            }
        };
        
        // Run the test
        testApiConnection();
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        // Add user message to chat
        const userMessage = {
            sender: 'user',
            text: input
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            console.log('Sending request to backend...');
            // Call the backend API using fetch with mode: 'cors'
            const response = await fetch('http://localhost:5002/api/gemini/ask', {
                method: 'POST',
                mode: 'cors', // Important for cross-origin requests
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ message: input })
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                // Try to get error details from response
                let errorMessage = `HTTP error! Status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    console.error('Error details:', errorData);
                    if (errorData.message) {
                        errorMessage += ` - ${errorData.message}`;
                    }
                } catch (e) {
                    console.error('Could not parse error response:', e);
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            console.log('Received data:', data);
            
            // Add bot response to chat
            const botMessage = {
                sender: 'bot',
                text: data.reply
            };

            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            // Add detailed error message to chat
            let errorText = 'Sorry, I encountered an error connecting to the AI service.';
            
            // If it's a Gemini API specific error, provide more helpful message
            if (error.message.includes('safety') || error.message.includes('blocked')) {
                errorText = 'The AI service blocked this request due to safety settings. Please try a different question.';
            } else if (error.message.includes('API key')) {
                errorText = 'There is an issue with the API key configuration. Please contact the administrator.';
            } else if (error.message.includes('500')) {
                errorText = 'The AI service is currently experiencing issues. Please try again later.';
            }
            
            const errorMessage = {
                sender: 'bot',
                text: errorText
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                padding: '40px 20px',
                maxWidth: '1000px',
                margin: '0 auto',
                height: 'calc(100vh - 150px)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1 style={{
                fontSize: '2.5rem',
                color: 'orange',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                AI Coding Assistant
            </h1>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                height: '600px', // Fixed height for chatbox
                maxHeight: '70vh', // Responsive max height
            }}>
                {/* Scrollable chat messages area */}
                <div style={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    marginBottom: '20px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    height: '100%',
                }}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '0',
                                padding: '20px 0',
                                borderBottom: '2px solid #f5f5f5',
                            }}
                        >
                            {/* Inner container with proper alignment */}
                            <div style={{
                                display: 'flex',
                                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                                alignItems: 'flex-start',
                                gap: '25px',
                                maxWidth: '75%',
                            }}>
                                {/* Profile Picture */}
                                {message.sender === 'bot' ? (
                                    <img
                                        src={aiProfilePic}
                                        alt="AI Profile"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid orange',
                                            background: '#fff',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            background: '#ffa500', /* Orange background for user profile */
                                            border: '2px solid #eee',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '14px'
                                        }}
                                    >
                                        YOU
                                    </div>
                                )}
                                {/* Message Bubble */}
                                <div style={{
                                    maxWidth: '60%',
                                    padding: '14px 18px',
                                    borderRadius: message.sender === 'user' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                                    backgroundColor: message.sender === 'user' ? 'orange' : '#f0f0f0',
                                    color: message.sender === 'user' ? 'white' : '#333',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: 16,
                                    fontFamily: 'inherit',
                                    wordBreak: 'break-word',
                                    marginLeft: message.sender === 'user' ? 0 : 0,
                                    marginRight: message.sender === 'user' ? 0 : 0,
                                }}>
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginBottom: '15px'
                        }}>
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '18px',
                                backgroundColor: '#f0f0f0',
                                color: 'black',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                                <ThinkingAnimation />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div style={{
                    display: 'flex',
                    borderTop: '1px solid #eee',
                    paddingTop: '15px'
                }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message or paste code here..."
                        style={{
                            flexGrow: 1,
                            border: '1px solid #ddd',
                            borderRadius: '20px',
                            padding: '12px 15px',
                            fontSize: '16px',
                            resize: 'none',
                            outline: 'none',
                            fontFamily: 'inherit',
                            marginRight: '10px',
                            height: '50px',
                            lineHeight: '24px'
                        }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={isLoading || input.trim() === ''}
                        style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: (isLoading || input.trim() === '') ? 'not-allowed' : 'pointer',
                            opacity: (isLoading || input.trim() === '') ? 0.7 : 1
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Chatbot;
