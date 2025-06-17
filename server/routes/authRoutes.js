import express from 'express';
import {
  renderLogin,
  loginUser,
  logoutUser,
  registerAdmin
} from '../controllers/authController.js';

const router = express.Router();

router.get('/', renderLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// One-time admin registration (optional)
router.post('/register-admin', registerAdmin);

export default router;
