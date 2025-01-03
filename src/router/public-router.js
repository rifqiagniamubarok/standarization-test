import express from 'express';
import userController from '../controller/user-controller.js';

export const publicRouter = new express.Router();

// Auth
publicRouter.post('/auth/register', userController.register);
publicRouter.post('/auth/login', userController.login);
