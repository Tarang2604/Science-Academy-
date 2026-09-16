import { Request, Response, NextFunction } from 'express';

const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];

export const csrfOriginProtection = (req: Request, res: Response, next: NextFunction) => {
  // Only inspect state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin || req.headers.referer;

    // In non-browser or tool requests where origin is missing, rely on token authentication
    if (origin) {
      const isAllowed = ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
      if (!isAllowed) {
        return res.status(403).json({
          success: false,
          message: 'Access forbidden: Request origin mismatch or unauthorized domain.',
        });
      }
    }
  }

  next();
};
