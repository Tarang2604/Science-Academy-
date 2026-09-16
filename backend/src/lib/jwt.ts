import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'science_academy_fallback_secret_key_2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};
