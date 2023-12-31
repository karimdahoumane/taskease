import bcrypt from "bcrypt";
import User from "../models/user.model";
import { IUser } from "../types/user";
import { BadRequestError, UnauthorizedError } from "../helpers/errors";
import { setCookie, signToken } from "../helpers/jwt";
import { EUserRole } from "../types/user";
import { Response } from "express";

export const registerUser = async (email: string, firstName: string, lastName: string, role: string, password: string, res: Response) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  if (role !== EUserRole.Admin && role !== EUserRole.User) {
    throw new BadRequestError("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    email,
    firstName,
    lastName,
    role,
    password: hashedPassword,
  });

  await newUser.save();

  const token: string = signToken(newUser._id);
  setCookie(res, token);

  return { email: newUser.email, token, message: "Registration successful" };
}

export const loginUser = async (email: string, password: string, res: Response) => {
  const user: IUser = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new UnauthorizedError("Incorrect email or password");
  }

  const token: string = signToken(user._id);
  setCookie(res, token);

  return { email: user.email, token, message: "Login successful" };
}