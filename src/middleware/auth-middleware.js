import { jwtVerify } from '../utils/encryption.js';

export const authMiddleware = (req, res, next) => {
  try {
    const errMessage = { messsage: 'Unauthorized' };
    const authorization = req.get('Authorization');

    const token = authorization.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({
        errors: [errMessage],
      });
    }
    const { id, username } = jwtVerify(token);

    req.user = { id, username };

    return next();
  } catch (err) {
    return res.status(401).json({
      errors: [{ messsage: 'Unauthorized', ...err }],
    });
  }
};
