import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

// --- FACULTY ---
export const getAdminFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faculty = await prisma.faculty.findMany({ orderBy: { name: 'asc' } });
    return res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
};

export const createAdminFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, subject, qualification, experienceYrs, bio, photoUrl, isVerified } = req.body;
    if (!name || !subject || !qualification) {
      return res.status(400).json({ success: false, message: 'Name, subject, and qualification are required.' });
    }
    const slug = (name + '-' + subject).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const created = await prisma.faculty.create({
      data: {
        slug,
        name,
        subject,
        qualification,
        experienceYrs: experienceYrs ? Number(experienceYrs) : null,
        bio: bio || '',
        photoUrl: photoUrl || null,
        isVerified: isVerified ?? false,
      },
    });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

export const updateAdminFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;
    const updated = await prisma.faculty.update({
      where: { id },
      data: { isVerified: Boolean(isVerified) },
    });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// --- TESTIMONIALS ---
export const getAdminTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createAdminTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorName, authorRole, content, rating, isVerified } = req.body;
    if (!authorName || !content) {
      return res.status(400).json({ success: false, message: 'Author name and content are required.' });
    }
    const created = await prisma.testimonial.create({
      data: {
        authorName,
        authorRole: authorRole || 'Student',
        content,
        rating: rating ? Number(rating) : 5,
        isVerified: isVerified ?? false,
      },
    });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

export const updateAdminTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;
    const updated = await prisma.testimonial.update({
      where: { id },
      data: { isVerified: Boolean(isVerified) },
    });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// --- STORIES / INTERVIEWS ---
export const getAdminStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.interview.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createAdminStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, studentName, videoUrl, category, isVerified, status } = req.body;
    if (!title || !studentName || !videoUrl) {
      return res.status(400).json({ success: false, message: 'Title, student name, and video URL are required.' });
    }
    const created = await prisma.interview.create({
      data: {
        title,
        studentName,
        videoUrl,
        category: category || 'TOPPER',
        isVerified: isVerified ?? false,
        status: status || 'DRAFT',
      },
    });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

export const updateAdminStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isVerified, status } = req.body;
    const updated = await prisma.interview.update({
      where: { id },
      data: {
        ...(isVerified !== undefined && { isVerified: Boolean(isVerified) }),
        ...(status && { status }),
      },
    });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// --- BLOG ---
export const getAdminBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const createAdminBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, excerpt, content, category, author, status } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt: excerpt || '',
        content,
        category: category || 'ACADEMIC',
        author: author || 'Science Academy Academic Team',
        status: status || 'DRAFT',
      },
    });
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updateAdminBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.blogPost.update({
      where: { id },
      data: { ...(status && { status }) },
    });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
