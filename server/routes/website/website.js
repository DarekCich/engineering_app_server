import { Router } from 'express';
import homeRoutes from './home/home.cjs';
import loginRoutes from './login/login.cjs';

const router = Router();

router.use('/home', homeRoutes);
router.use('/login', loginRoutes);

export default router;