import Joi from 'joi';

export const registerUserValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});
