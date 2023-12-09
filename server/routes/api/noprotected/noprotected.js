import { Router } from 'express';
import { registerUser, loginUser } from '../../../helpers/userManager.js';
import jwt from 'jsonwebtoken';
const router = Router();
const secretKey = 'sekretny_klucz'
// Skonfiguruj dostęp do katalogu `/web` na ścieżce '/'

// Dla ścieżki '/' dostarcz plik index.html
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const response = await registerUser(username, password);
  res.json(response);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const response = await loginUser(username, password);
  if (response.code === 0) {
    // Przykładowe dane użytkownika
    const userData = {
      userId: 123,
      username: username  // Użyj nazwy użytkownika z żądania
    };

    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });
    res.setHeader('Authorization', `Bearer ${token}`);
  }
  res.json(response);
});

router.get('/ping', (req, res) => {
  res.json({ message: "no protected ping" });
});
export default router;


