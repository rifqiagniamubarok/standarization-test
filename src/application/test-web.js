import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js';
import setupRouter from '../router/index.js';

const web = express();

// Middleware
web.use(express.json());

setupRouter(web);

// Error middlewar
web.use(errorMiddleware);

export { web };
