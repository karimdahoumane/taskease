import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../types/user";

export async function registerUser(email: string, firstName: string, lastName: string, password: string) {
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

  const userEmail: string = newUser.email;
  const token: string = jwt.sign({ email: userEmail }, process.env.JWT_KEY as string);
  if (!token) {
    return { error: "Token generation error" };
  }

  await newUser.save();
  return { email, token, message: "User registered successfully" };
}

export async function loginUser(email: string, password: string) {
  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid credentials" };
  }

  const passwordMatch: Boolean = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Invalid credentials" };
  }

  const token: string = jwt.sign({ email: user.email }, process.env.JWT_KEY as string);

  return { email, token, message: "Login successful" };
}