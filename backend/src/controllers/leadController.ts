import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { createLeadSchema, consultationWizardSchema, updateLeadStatusSchema } from '../validators/leadValidators.js';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        targetClass: validatedData.targetClass || null,
        subjects: validatedData.subjects || null,
        persona: validatedData.persona || null,
        preferredTiming: validatedData.preferredTiming || null,
        message: validatedData.message || null,
        type: validatedData.type || 'CONTACT',
        status: 'NEW',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Science Academy. We will get back to you shortly!',
      data: { id: lead.id },
    });
  } catch (error) {
    next(error);
  }
};

export const submitConsultation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = consultationWizardSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        persona: validatedData.persona,
        targetClass: validatedData.targetClass,
        preferredTiming: validatedData.preferredTiming || null,
        message: `Goal: ${validatedData.primaryGoal}`,
        type: 'CONSULTATION',
        status: 'NEW',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your 1-on-1 Academic Consultation request has been submitted successfully!',
      data: { id: lead.id },
    });
  } catch (error) {
    next(error);
  }
};

// Admin Overview Dashboard Metrics
export const getDashboardMetricsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalLeads = await prisma.lead.count({
      where: { type: { not: 'CONSULTATION' } },
    });

    const newLeads = await prisma.lead.count({
      where: { type: { not: 'CONSULTATION' }, status: 'NEW' },
    });

    const totalConsultations = await prisma.lead.count({
      where: { type: 'CONSULTATION' },
    });

    const newConsultations = await prisma.lead.count({
      where: { type: 'CONSULTATION', status: 'NEW' },
    });

    const recentLeads = await prisma.lead.findMany({
      where: { type: { not: 'CONSULTATION' } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentConsultations = await prisma.lead.findMany({
      where: { type: 'CONSULTATION' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalLeads,
          newLeads,
          totalConsultations,
          newConsultations,
        },
        recentLeads,
        recentConsultations,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin Lead Listing with Search & Filtering
export const getLeadsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, status, type, sort } = req.query;

    const whereClause: any = {
      type: type ? (type as string) : { not: 'CONSULTATION' },
    };

    if (status && status !== 'ALL') {
      whereClause.status = status as string;
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const term = search.trim();
      whereClause.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { phone: { contains: term, mode: 'insensitive' } },
        { email: { contains: term, mode: 'insensitive' } },
        { targetClass: { contains: term, mode: 'insensitive' } },
      ];
    }

    const orderBy = sort === 'oldest' ? { createdAt: 'asc' as const } : { createdAt: 'desc' as const };

    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy,
    });

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Consultation Listing
export const getConsultationsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, status, sort } = req.query;

    const whereClause: any = {
      type: 'CONSULTATION',
    };

    if (status && status !== 'ALL') {
      whereClause.status = status as string;
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const term = search.trim();
      whereClause.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { phone: { contains: term, mode: 'insensitive' } },
        { targetClass: { contains: term, mode: 'insensitive' } },
        { message: { contains: term, mode: 'insensitive' } },
      ];
    }

    const orderBy = sort === 'oldest' ? { createdAt: 'asc' as const } : { createdAt: 'desc' as const };

    const consultations = await prisma.lead.findMany({
      where: whereClause,
      orderBy,
    });

    return res.status(200).json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Update Lead or Consultation Status & Notes
export const updateLeadStatusAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateLeadStatusSchema.parse(req.body);

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(validatedData.status && { status: validatedData.status as any }),
        ...(validatedData.notes !== undefined && { notes: validatedData.notes }),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};
