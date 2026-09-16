import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getAdminCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await prisma.course.findMany({
      include: { batches: true },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { tagline, description, overview, isVerified } = req.body;

    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...(tagline !== undefined && { tagline }),
        ...(description !== undefined && { description }),
        ...(overview !== undefined && { overview }),
        ...(isVerified !== undefined && { isVerified: Boolean(isVerified) }),
      },
    });

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
