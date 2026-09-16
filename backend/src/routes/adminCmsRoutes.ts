import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getAdminResults, createAdminResult, updateAdminResult } from '../controllers/adminResultController.js';
import { getAdminGallery, createAdminGallery, updateAdminGallery } from '../controllers/adminGalleryController.js';
import { getAdminCourses, updateAdminCourse } from '../controllers/adminCourseController.js';
import {
  getAdminFaculty,
  createAdminFaculty,
  updateAdminFaculty,
  getAdminTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  getAdminStories,
  createAdminStory,
  updateAdminStory,
  getAdminBlog,
  createAdminBlog,
  updateAdminBlog,
} from '../controllers/adminContentController.js';

const router = Router();

// Protect all admin CMS endpoints with authentication
router.use('/admin', requireAuth);

// Admin Results
router.get('/admin/results', getAdminResults);
router.post('/admin/results', createAdminResult);
router.patch('/admin/results/:id', updateAdminResult);

// Admin Gallery
router.get('/admin/gallery', getAdminGallery);
router.post('/admin/gallery', createAdminGallery);
router.patch('/admin/gallery/:id', updateAdminGallery);

// Admin Courses
router.get('/admin/courses', getAdminCourses);
router.patch('/admin/courses/:id', updateAdminCourse);

// Admin Faculty
router.get('/admin/faculty', getAdminFaculty);
router.post('/admin/faculty', createAdminFaculty);
router.patch('/admin/faculty/:id', updateAdminFaculty);

// Admin Testimonials
router.get('/admin/testimonials', getAdminTestimonials);
router.post('/admin/testimonials', createAdminTestimonial);
router.patch('/admin/testimonials/:id', updateAdminTestimonial);

// Admin Stories
router.get('/admin/stories', getAdminStories);
router.post('/admin/stories', createAdminStory);
router.patch('/admin/stories/:id', updateAdminStory);

// Admin Blog
router.get('/admin/blog', getAdminBlog);
router.post('/admin/blog', createAdminBlog);
router.patch('/admin/blog/:id', updateAdminBlog);

export default router;
