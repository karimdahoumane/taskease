import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { registerUser, loginUser } from "../services/auth.service";
import { IUser } from "./../types/user";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, password }: IUser = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const registrationResult = await registerUser(email, firstName, lastName, password);

    if (registrationResult.error) {
      res.status(400).json({ message: registrationResult.error });
      return;
    }

    res.status(201).json(registrationResult);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password }: { email: string, password: string } = req.body;
    const loginResult = await loginUser(email, password);

    if (loginResult.error) {
      res.status(401).json({ message: loginResult.error });
      return;
    }

    res.status(200).json(loginResult);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

export { register, login };