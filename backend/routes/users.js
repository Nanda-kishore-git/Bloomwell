// Users routes
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// GET /credits - Get credits for the default user
router.get('/credits', (req, res) => {
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const user = users.find(u => u.id === 1);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ credits: user.credits });
  } catch (error) {
    console.error('Error reading users.json:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;