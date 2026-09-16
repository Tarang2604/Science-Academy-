import { Router } from 'express';
import { loginAdmin, logoutAdmin, getMe } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/auth/login', loginAdmin);
router.post('/auth/logout', logoutAdmin);
router.get('/auth/me', requireAuth, getMe);

export default router;
