import { Router } from 'express';
import {
  createLead,
  submitConsultation,
  getDashboardMetricsAdmin,
  getLeadsAdmin,
  getConsultationsAdmin,
  updateLeadStatusAdmin,
} from '../controllers/leadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public Lead & Consultation Endpoints
router.post('/leads', createLead);
router.post('/consultations', submitConsultation);

// Protected Admin Overview Dashboard
router.get('/admin/dashboard', requireAuth, getDashboardMetricsAdmin);

// Protected Admin Lead Management
router.get('/admin/leads', requireAuth, getLeadsAdmin);
router.patch('/admin/leads/:id', requireAuth, updateLeadStatusAdmin);

// Protected Admin Consultation Management
router.get('/admin/consultations', requireAuth, getConsultationsAdmin);
router.patch('/admin/consultations/:id', requireAuth, updateLeadStatusAdmin);

export default router;
