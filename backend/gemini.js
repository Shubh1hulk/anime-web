// Gemini API integration for backend AI assistant
// You must provide your own Gemini API key in the .env file as GEMINI_API_KEY
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not set in environment variables');
  }
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    // Gemini's response structure
    const candidates = response.data.candidates;
    if (candidates && candidates.length > 0) {
      return candidates[0].content.parts[0].text;
    }
    return 'Gemini did not return a response.';
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    return 'Sorry, the AI is currently unavailable.';
  }
}

module.exports = { askGemini };
