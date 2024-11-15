import { NextFunction, Request, Response } from 'express';

export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10 } = req?.query;

  const skip = (Number(page) - 1) * Number(limit);
  req.query.skip = skip.toString();
  req.query.limit = limit.toString();

  next();
};
