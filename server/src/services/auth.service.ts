import bcrypt from "bcrypt";
import User from "../models/user.model";
import { IUser } from "../types/user";
import { UnauthorizedError } from "../helpers/errors";
import { signToken } from "../helpers/jwt";

export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const token: string = signToken(newUser._id);

  await newUser.save();

  return { email: newUser.email, token, message: "Registration successful" };
}

export const loginUser = async (email: string, password: string) => {
  const user: IUser = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new UnauthorizedError("Incorrect email or password");
  }

  const token: string = signToken(user._id);

  return { email: user.email, token, message: "Login successful" };
}