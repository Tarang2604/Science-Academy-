import { Router } from 'express';
import {
  getPublicResults,
  getPublicGallery,
  getPublicFaculty,
  getPublicTestimonials,
  getPublicStories,
  getPublicBlog,
} from '../controllers/publicContentController.js';

const router = Router();

router.get('/results', getPublicResults);
router.get('/gallery', getPublicGallery);
router.get('/faculty', getPublicFaculty);
router.get('/testimonials', getPublicTestimonials);
router.get('/stories', getPublicStories);
router.get('/blog', getPublicBlog);

export default router;
