import { z } from 'zod';

const phoneRegex = /^[6-9]\d{9}$/;

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  targetClass: z.string().optional(),
  subjects: z.string().optional(),
  persona: z.enum(['STUDENT', 'PARENT']).optional(),
  preferredTiming: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(['ADMISSION', 'DEMO', 'CONSULTATION', 'CONTACT']).optional().default('CONTACT'),
});

export const consultationWizardSchema = z.object({
  persona: z.enum(['STUDENT', 'PARENT']),
  targetClass: z.string().min(1, 'Target class/batch is required'),
  primaryGoal: z.string().min(1, 'Primary guidance goal is required'),
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian mobile number'),
  preferredTiming: z.string().optional(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'SCHEDULED', 'CONVERTED', 'CLOSED']).optional(),
  notes: z.string().max(1000).optional(),
});

