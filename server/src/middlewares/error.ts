import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/errors';

const exceptionHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJson());
  }

  return res.status(500).json({
    statusCode: 500,
    message: error.message || "An unexpected error occurred",
  });
};

export default exceptionHandler;