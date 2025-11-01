const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    // Simulate API call delay for testing purposes
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock response replacing OpenRouter API call temporarily
    const replyContent = "Mock reply from BloomBot — backend connected successfully!";
    res.json({ reply: replyContent });
  } catch (error) {
    console.error('DEBUG: Error in chat route caught:', error.response?.data || error.message);

    if (error.response) {
      const status = error.response.status;
      console.log('DEBUG: Error response status:', status);
      if (status === 402) {
        return res.status(200).json({ reply: "BloomBot is temporarily unavailable — check your OpenRouter credits or key settings." });
      }
    }

    console.error('Error connecting to OpenRouter');
    res.status(500).json({ error: "Error connecting to OpenRouter" });
  }
});

module.exports = router;