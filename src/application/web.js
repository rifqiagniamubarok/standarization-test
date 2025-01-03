import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js';
import morgan from '../middleware/morgan-middleware.js';
import { setupSwagger } from './swagger.js';
import setupRouter from '../router/index.js';
import corsMiddleware from '../middleware/cors-middleware.js';

const web = express();

// Swagger
setupSwagger(web);

// Middleware
web.use(express.json());
web.use(morgan);
web.use(corsMiddleware);

setupRouter(web);
// Error middlewar
web.use(errorMiddleware);

export { web };
