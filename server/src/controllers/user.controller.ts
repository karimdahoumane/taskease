import { Response, Request } from "express";
import * as UserService from "../services/user.service";
import { IUser } from "./../types/user";

const getUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await UserService.findAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "An error occurred while getting users" });
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser = await UserService.removeUser(req.params.id);
    res.status(200).json({ deletedUser });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "An error occurred while deleting user" });
  }
}

export { getUsers, deleteUser };