import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[SERVER ERROR]:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  const statusCode = err.statusCode && typeof err.statusCode === 'number' ? err.statusCode : 500;

  // Sanitize all internal server / database / uncaught exceptions to prevent technical leakage
  const safeMessage =
    statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404
      ? err.message || 'Request failed'
      : 'An unexpected server error occurred. Please try again later.';

  return res.status(statusCode).json({
    success: false,
    message: safeMessage,
  });
};
