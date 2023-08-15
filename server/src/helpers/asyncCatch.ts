import { Request, Response, NextFunction } from 'express';

export const asyncCatch = (handler: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};