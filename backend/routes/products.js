const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all products
router.get('/', (req, res) => {
  const productsPath = path.join(__dirname, '../data/products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products file:', err);
      return res.status(500).json({ error: 'Unable to load products' });
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseErr) {
      console.error('Error parsing products JSON:', parseErr);
      res.status(500).json({ error: 'Invalid products data' });
    }
  });
});

module.exports = router;