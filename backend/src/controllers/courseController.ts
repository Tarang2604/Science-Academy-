import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
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

export const getCourseBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const course = await prisma.course.findUnique({
      where: { slug },
      include: { batches: true },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
