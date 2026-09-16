import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getAdminResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, year, status } = req.query;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { studentName: { contains: String(search), mode: 'insensitive' } },
        { examName: { contains: String(search), mode: 'insensitive' } },
        { subject: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (year && !isNaN(Number(year))) {
      whereClause.year = Number(year);
    }

    if (status) {
      whereClause.status = String(status);
    }

    const toppers = await prisma.topper.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: toppers,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentName, examName, year, score, subject, photoUrl, story, isVerified, status } = req.body;

    if (!studentName || !examName) {
      return res.status(400).json({
        success: false,
        message: 'Student name and exam name are required.',
      });
    }

    const baseSlug = (studentName + '-' + (year || 'result')).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Date.now()}`;

    const newTopper = await prisma.topper.create({
      data: {
        slug,
        studentName,
        examName,
        year: year ? Number(year) : 2024,
        score: score || 'Pass',
        subject: subject || null,
        photoUrl: photoUrl || null,
        story: story || null,
        isVerified: isVerified ?? false,
        status: status || 'DRAFT',
      },
    });

    return res.status(201).json({
      success: true,
      data: newTopper,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { studentName, examName, year, score, subject, photoUrl, story, isVerified, status } = req.body;

    const existing = await prisma.topper.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Result record not found' });
    }

    const updated = await prisma.topper.update({
      where: { id },
      data: {
        ...(studentName && { studentName }),
        ...(examName && { examName }),
        ...(year !== undefined && { year: Number(year) }),
        ...(score !== undefined && { score }),
        ...(subject !== undefined && { subject }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(story !== undefined && { story }),
        ...(isVerified !== undefined && { isVerified: Boolean(isVerified) }),
        ...(status && { status }),
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
