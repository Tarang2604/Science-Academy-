import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

// Public Results API (Returns only PUBLISHED + VERIFIED toppers)
export const getPublicResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { year, examName } = req.query;
    const whereClause: any = {
      status: 'PUBLISHED',
      isVerified: true,
    };

    if (year && !isNaN(Number(year))) {
      whereClause.year = Number(year);
    }
    if (examName) {
      whereClause.examName = { contains: String(examName), mode: 'insensitive' };
    }

    const results = await prisma.topper.findMany({
      where: whereClause,
      orderBy: { year: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Public Gallery API (Returns only PUBLISHED + VERIFIED gallery items)
export const getPublicGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const whereClause: any = {
      status: 'PUBLISHED',
      isVerified: true,
    };

    if (category) {
      whereClause.category = String(category);
    }

    const items = await prisma.galleryItem.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// Public Faculty API (Returns only VERIFIED faculty)
export const getPublicFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faculty = await prisma.faculty.findMany({
      where: { isVerified: true },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

// Public Testimonials API (Returns only VERIFIED testimonials)
export const getPublicTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isVerified: true },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// Public Stories API (Returns only PUBLISHED + VERIFIED interviews/stories)
export const getPublicStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stories = await prisma.interview.findMany({
      where: { status: 'PUBLISHED', isVerified: true },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: stories,
    });
  } catch (error) {
    next(error);
  }
};

// Public Blog API (Returns only PUBLISHED blog posts)
export const getPublicBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
