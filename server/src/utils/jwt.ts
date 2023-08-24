import jwt from 'jsonwebtoken';

export const signToken = (id: string) => {
  return jwt.sign(
    { sub: id, iat: Date.now() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    }
  );
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
