import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import leadRoutes from './routes/leadRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminCmsRoutes from './routes/adminCmsRoutes.js';
import publicContentRoutes from './routes/publicContentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { csrfOriginProtection } from './middleware/csrfMiddleware.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Serve uploads directory statically for web assets
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public/uploads')));

// Security & Middlewares
app.use(
  cors({
    origin: [
      CLIENT_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5174',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrfOriginProtection);

// General Rate Limiting on API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

// Dedicated Stricter Rate Limiter for Admin Login (5 attempts per 15 minutes)
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

app.use('/api/auth/login', loginRateLimiter);
app.use('/api', apiLimiter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    institute: 'Science Academy Ratlam',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', leadRoutes);
app.use('/api', courseRoutes);
app.use('/api', authRoutes);
app.use('/api', adminCmsRoutes);
app.use('/api', publicContentRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER RUNNING]: Science Academy API active on http://localhost:${PORT}`);
});

export default app;
