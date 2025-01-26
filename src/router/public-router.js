import express from 'express';
import userController from '../controller/user-controller.js';
import bulkdataController from '../controller/bulkdata.js';

export const publicRouter = new express.Router();

// Auth
publicRouter.post('/auth/register', userController.register);
publicRouter.post('/auth/login', userController.login);

// bulk data
publicRouter.post('/bulkdata-create-false', bulkdataController.createBulkDataLooping);
publicRouter.post('/bulkdata-create-true', bulkdataController.createBulkDataTrue);
