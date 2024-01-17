const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware funkcja obsługująca dostęp do katalogu `/web` na ścieżce '/'
router.use('/', express.static(path.join(__dirname, 'web')));

// Dla ścieżki '/' dostarcz plik index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

module.exports = router;
