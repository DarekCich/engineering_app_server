import { Router } from 'express';
import protectedRoutes from './protected/protected.js';
import noProtectedRoutes from './noprotected/noprotected.js';
import jwt from 'jsonwebtoken';
const secretKey = 'sekretny_klucz'
const router = Router();

function verifyToken(req, res, next) {
  try{
    const token = req.headers.authorization.slice(0, 6) === "Bearer" ? req.headers.authorization.slice(7) : req.headers.authorization;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403); // Brak dostępu
      } else {
        req.user = decoded; // Dodanie danych użytkownika do obiektu żądania
        next();
      }
    });
  }catch{
    res.sendStatus(403);
  }

}

router.use('/protected',   verifyToken, protectedRoutes); 
router.use('/noprotected', noProtectedRoutes); 

export default router;