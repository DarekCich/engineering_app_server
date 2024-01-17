import { Router } from 'express';
import homeRoutes from './home/home.cjs';
import loginRoutes from './login/login.cjs';
import registerRoutes from './register/register.cjs';
import userHomePage   from './userHomePage/userHomePage.cjs'
import session from'express-session';
const router = Router();

router.use(session({
  secret: 'tajnyKluczSesji',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ustawienie bezpieczeństwa ciasteczka (wymaga połączenia HTTPS)
}));


function verifyToken(req, res, next) {
  console.log(res.headers);
  const token = req.headers.authorization.slice(0, 6) === "Bearer" ? req.headers.authorization.slice(7) : req.headers.authorization;
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.sendStatus(403); // Brak dostępu
    } else {
      req.user = decoded; // Dodanie danych użytkownika do obiektu żądania
      next();
    }
  });
}

router.use('/userHomePage',   verifyToken, userHomePage); 
router.use('/home',     homeRoutes);
router.use('/login',    loginRoutes);
router.use('/register', registerRoutes);

export default router;