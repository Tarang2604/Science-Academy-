import { Router } from 'express';
import { getAllCourses, getCourseBySlug } from '../controllers/courseController.js';

const router = Router();

router.get('/courses', getAllCourses);
router.get('/courses/:slug', getCourseBySlug);

export default router;
