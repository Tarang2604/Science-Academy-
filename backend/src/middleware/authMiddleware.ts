import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../lib/jwt.js';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in as an administrator.',
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }

  req.user = decoded;
  next();
};
