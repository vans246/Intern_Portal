import express from 'express';
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dns from 'dns';

// Use public DNS providers (Cloudflare and Google) to avoid local DNS issues.
// Remove or modify if you rely on system DNS or have internal DNS requirements.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
  'http://127.0.0.1:5177',
  'http://127.0.0.1:5178',
  'https://localhost:5173',
  'https://localhost:5174',
  'https://localhost:5175',
  'https://localhost:5176',
  'https://localhost:5177',
  'https://localhost:5178',
  'https://127.0.0.1:5173',
  'https://127.0.0.1:5174',
  'https://127.0.0.1:5175',
  'https://127.0.0.1:5176',
  'https://127.0.0.1:5177',
  'https://127.0.0.1:5178',
  process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return /https:\/\/.*\.app\.github\.dev$/i.test(origin);
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// Parse JSON request bodies and populate `req.body`.
app.use(express.json());

// Parse cookies and populate `req.cookies`.
app.use(cookieParser());

// Mount authentication routes at `/api/auth` (e.g., `/api/auth/login`).
app.use('/api/auth', authRouter);

// Mount admin management routes at `/api/admin`.
app.use('/api/admin', adminRouter);

export default app;