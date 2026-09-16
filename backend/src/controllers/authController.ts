import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error('[DB AUTH ERROR]:', dbError);
      // Fallback check against environment-configured initial admin if database user query fails
      const envAdminEmail = process.env.ADMIN_EMAIL;
      const envAdminPass = process.env.ADMIN_INITIAL_PASSWORD;
      
      if (envAdminEmail && envAdminPass && email === envAdminEmail && password === envAdminPass) {
        const token = signToken({
          userId: 'env-admin',
          email: envAdminEmail,
          role: 'ADMIN',
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 8 * 60 * 60 * 1000, // 8 hours
        });

        return res.status(200).json({
          success: true,
          message: 'Admin authentication successful',
          data: {
            id: 'env-admin',
            email: envAdminEmail,
            name: 'Science Academy Administrator',
          },
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    // Check environment-driven provisioning if user doesn't exist in DB yet
    if (!user) {
      const envAdminEmail = process.env.ADMIN_EMAIL;
      const envAdminPass = process.env.ADMIN_INITIAL_PASSWORD;

      if (envAdminEmail && envAdminPass && email === envAdminEmail && password === envAdminPass) {
        // Create initial admin user in database safely
        const hashedPassword = await bcrypt.hash(envAdminPass, 12);
        try {
          user = await prisma.user.create({
            data: {
              email: envAdminEmail,
              password: hashedPassword,
              name: 'Science Academy Administrator',
              role: 'ADMIN',
            },
          });
        } catch {
          // If creation fails, proceed with session sign
        }

        const token = signToken({
          userId: user?.id || 'env-admin',
          email: envAdminEmail,
          role: 'ADMIN',
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 8 * 60 * 60 * 1000, // 8 hours
        });

        return res.status(200).json({
          success: true,
          message: 'Admin authentication successful',
          data: {
            id: user?.id || 'env-admin',
            email: envAdminEmail,
            name: 'Science Academy Administrator',
          },
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    if (user.role !== 'ADMIN') {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('[AUTH ERROR]:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials',
    });
  }
};

export const logoutAdmin = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  return res.status(200).json({
    success: true,
    data: {
      email: user.email,
      role: user.role,
    },
  });
};
