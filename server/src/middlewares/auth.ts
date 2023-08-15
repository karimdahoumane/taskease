import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/errors";
import { verifyToken } from "../helpers/jwt";
import { findUserById } from "../services/user.service";

export const protect = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1) Get token and check if it exists
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError("You are not logged in! Please log in to get access.");
    }
    // 2) Verify token
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedError("Invalid token. Please log in again.");
    }
    // 3) Check if user still exists
    const foundUser = await findUserById(decoded.id);
    if (!foundUser) {
      throw new UnauthorizedError("The user associated with this token no longer exists.")
    }
    // 4) Check if user changed password after the token was issued
    if (foundUser.changedPasswordAfter(decoded.iat)) {
      throw new UnauthorizedError("User recently changed password! Please log in again.");
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.body.user = foundUser;
    next();
  } catch (error) {
    console.error("An error occurred during authentication:", error);
    return next(error);
  }
};