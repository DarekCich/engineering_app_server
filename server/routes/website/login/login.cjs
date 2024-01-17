const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken'); // Dodaj wymaganą bibliotekę JWT
const secretKey = 'sekretny_klucz'

// Funkcja pomocnicza do weryfikacji tokenu JWT
const verifyToken = (req, res, next) => {
  console.log('start');
  const token = req.headers.authorization;
  try{
    console.log('1');
    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Komunikat błędu'); 
    }
    const tokenValue = token.slice(7); // Pobierz wartość tokena bez 'Bearer '
    jwt.verify(tokenValue, secretKey, (err, decoded) => {
      if (err) {
        throw new Error('Komunikat błędu'); 
      } else {
        console.log('no err');
        const htmlPath = path.join(__dirname, 'web','protected.html');
        const htmlContent = require('fs').readFileSync(htmlPath, 'utf-8');
      
        // Ścieżki do plików CSS i JS
        const cssPath = 'styles.css';
        const jsPath = 'protectedscript.js';
      
        // Zwróć zawartość pliku HTML, ścieżki do plików CSS i JS w odpowiedzi
        res.send({ htmlContent, cssPath, jsPath });; // Obsługa błprzypadku poprawnego tokenu JWT
      }
    });
  }catch{
    console.log('err');
    const htmlPath = path.join(__dirname, 'web','normal.html');
    const htmlContent = require('fs').readFileSync(htmlPath, 'utf-8');
  
    // Ścieżki do plików CSS i JS
    const cssPath = 'styles.css';
    const jsPath = 'normalscript.js';
  
    // Zwróć zawartość pliku HTML, ścieżki do plików CSS i JS w odpowiedzi
    res.send({ htmlContent, cssPath, jsPath });; // Obsługa błędu weryfikacji tokenu JWT
  }
};

// Middleware funkcja obsługująca dostęp do katalogu `/web` na ścieżce '/'
router.use('/', express.static(path.join(__dirname, 'web')));

// Dla ścieżki '/' dostarcz plik index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

// Obsługa ścieżki '/content/' z weryfikacją tokenu JWT
router.get('/content/', verifyToken);

module.exports = router;
