const express = require('express');
const router = express.Router();
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI with API key
const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key available:', !!apiKey);

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Simple test endpoint to verify connectivity
router.get('/test', (req, res) => {
  console.log('Test endpoint called');
  return res.status(200).json({ message: 'Backend server is working!' });
});

// POST route to ask Gemini a question
router.post('/ask', async (req, res) => {
  try {
    console.log('Received request to /api/gemini/ask');
    console.log('Request body:', req.body);
    
    const { message } = req.body;
    
    if (!message) {
      console.log('Error: Message is required');
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'API key is not configured' });
    }

    console.log('Using Gemini API key:', apiKey ? 'Key is set' : 'Key is missing');
    
    try {
      // Get the generative model (Gemini Pro)
      // Using 'gemini-1.5-pro' which is the current model name
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      console.log('Sending message to Gemini API:', message);
      
      // Generate content based on the user's message
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();

      console.log('Received response from Gemini API');
      
      return res.status(200).json({ reply: text });
    } catch (geminiError) {
      console.error('Gemini API specific error:', geminiError);
      return res.status(500).json({ 
        error: 'Failed to get response from Gemini', 
        message: geminiError.message || 'Unknown error with Gemini API'
      });
    }
  } catch (error) {
    console.error('General error in route handler:', error);
    return res.status(500).json({ 
      error: 'Failed to process request', 
      message: error.message || 'Unknown error'
    });
  }
});

module.exports = router;
