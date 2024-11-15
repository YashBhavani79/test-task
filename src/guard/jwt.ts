import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: any;
}

class AuthController {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateAuthToken(userId: any): string {
    const token = jwt.sign({ userId }, this.secretKey, { expiresIn: '1h' });
    return token;
  }

  verifyAuthToken(token: string): string | object {
    try {
      const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:',);
      return '';
    }
  }

  generateForgetPasswordToken(userId: any): string {
    const token = jwt.sign({ userId }, this.secretKey, { expiresIn: '5m' });
    return token;
  }
}

export function AUTH(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Authorization token not provided' });
  }

  const decodedToken = authController.verifyAuthToken(token);

  if (!decodedToken) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid authorization token' });
  }

  req.tokenPayload = decodedToken;
  next();
}

const secretKey = 'mySecretIIDD';
export const authController = new AuthController(secretKey);
