import { Router } from 'express';
import { registerUser, loginUser } from '../../../helpers/userManager.js';
import path from 'path';
const router = Router();


router.get('/ping', (req, res) => {
  res.json({ message: "zabezpieczony git" });
});

export default router;