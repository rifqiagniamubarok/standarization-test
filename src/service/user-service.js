import bcrypt from 'bcryptjs';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import { jwtSign } from '../utils/encryption.js';

const register = async (request) => {
  const userRequest = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: userRequest.email,
    },
  });

  if (countUser !== 0) {
    throw new ResponseError(400, 'email has been used');
  }

  userRequest.password = await bcrypt.hash(userRequest.password, 10);

  const user = await prismaClient.user.create({
    data: userRequest,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};

const login = async (request) => {
  const userRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      email: userRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(400, 'Email or password wrong', ['general']);
  }

  const isPasswordValid = await bcrypt.compare(userRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(400, 'Email or password wrong', ['general']);
  }

  const tokenPayload = { id: user.id, name: user.name, email: user.email };

  const token = jwtSign(tokenPayload);

  const response = { ...tokenPayload, token };
  return response;
};

export default { register, login };
