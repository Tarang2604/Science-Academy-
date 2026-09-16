import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getAdminGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, status } = req.query;
    const whereClause: any = {};

    if (category) {
      whereClause.category = String(category);
    }
    if (status) {
      whereClause.status = String(status);
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

export const createAdminGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, category, imageUrl, caption, isVerified, status } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and imageUrl are required.',
      });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || 'CLASSROOM',
        imageUrl,
        caption: caption || null,
        isVerified: isVerified ?? false,
        status: status || 'DRAFT',
      },
    });

    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl, caption, isVerified, status } = req.body;

    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(imageUrl && { imageUrl }),
        ...(caption !== undefined && { caption }),
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
