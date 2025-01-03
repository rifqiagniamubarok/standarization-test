import jwt from 'jsonwebtoken';

const tokenSecret = process.env.JWT_SECRET || 'secret123';

const jwtSign = (payload) => {
  const token = jwt.sign(payload, tokenSecret, { expiresIn: 60 * 60 });
  return token;
};

const jwtVerify = (token) => {
  const decode = jwt.verify(token, tokenSecret);
  return decode;
};

export { jwtSign, jwtVerify };
