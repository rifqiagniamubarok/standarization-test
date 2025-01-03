import { publicRouter } from './public-router.js';

const setupRouter = (app) => {
  // Public
  app.use('/api/v1', publicRouter);
};

export default setupRouter;
