import { Response, Request, NextFunction } from "express";
import * as UserService from "../services/user.service";
import { IUser } from "../types/user";
import { asyncCatch } from "../helpers/asyncCatch";

const getUsers = asyncCatch(async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users: IUser[] = await UserService.findAllUsers();
  res.status(200).json({ users });
});

const deleteUser = asyncCatch(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const deletedUser: IUser = await UserService.removeUser(req.params.id);
  res.status(200).json({ deletedUser });
});

export { getUsers, deleteUser };