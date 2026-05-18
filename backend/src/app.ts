import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();

// Security
app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} in ${
          process.env.NODE_ENV || 'development'
        } mode`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

start();

export default app;