import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Yash",
            role: "Founder & Lead Developer",
            description: "Passionate about making coding education accessible to everyone.",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Alice",
            role: "Content Developer",
            description: "Expert in creating engaging learning materials.",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Bob",
            role: "UI/UX Designer",
            description: "Creating beautiful and intuitive user experiences.",
            image: "https://via.placeholder.com/150"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                padding: '40px 20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}
        >
            <h1 style={{
                fontSize: '2.5rem',
                color: 'orange',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                About Us
            </h1>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '30px',
                marginBottom: '40px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    color: '#333',
                    marginBottom: '20px',
                    fontSize: '1.8rem'
                }}>
                    Our Mission
                </h2>
                <p style={{
                    color: '#666',
                    lineHeight: '1.8',
                    fontSize: '1.1rem',
                    whiteSpace: 'pre-line'
                }}>
                    {`Welcome to SyntaxShiksha – your one-stop platform to simplify coding education!

At SyntaxShiksha, we believe that learning to code should be accessible, clear, and exciting for everyone. Started by three passionate students driven by a shared vision, our platform is designed to break the barriers of complicated programming jargon and make it easy to understand, especially for beginners.

We understand that not everyone comes from a technical background, so we've introduced a Hinglish mode — an innovative feature where explanations are available not just in English but also in easy-to-understand Hinglish (a mix of Hindi and English). Learning complex coding topics in a language you're comfortable with makes all the difference — and that's what SyntaxShiksha is all about.

What We Offer:
- Beginner-friendly explanations of programming concepts.
- A unique English ↔ Hinglish toggle to make learning personalized.
- Real-world examples and practice problems.
- Continuous improvements and features based on learner feedback.

SyntaxShiksha isn't just a platform; it’s a learning companion for students, coding enthusiasts, and self-learners across India who want to build their coding skills confidently.

Join us on this journey — because at SyntaxShiksha, syntax becomes simple, and Shiksha (education) becomes enjoyable. `}
                </p>
            </div>
        </motion.div>
    );
};

export default AboutUs;
