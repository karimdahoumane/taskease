import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as AuthService from "../services/auth.service";
import { IUser } from "../types/user";
import { BadRequestError } from "../helpers/errors";
import { asyncCatch } from "../helpers/asyncCatch";

const register = asyncCatch(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, firstName, lastName, password }: IUser = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array().map((error) => error.msg).join(", "));
  }

  const registrationResult = await AuthService.registerUser(email, firstName, lastName, password);
  if (registrationResult.error) {
    throw new BadRequestError(registrationResult.error);
  }

  res.status(201).json(registrationResult);
});

const login = asyncCatch(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array().map((error) => error.msg).join(", "));
  }

  const { email, password }: { email: string, password: string } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const loginResult = await AuthService.loginUser(email, password);

  res.status(200).json(loginResult);
});

export { register, login };