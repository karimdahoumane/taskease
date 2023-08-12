import User from "../models/user.model"
import { IUser } from "../types/user"

const findAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await User.find()
  if (!users) {
    throw new Error("No users found")
  }
  return users
}

const removeUser = async (id: string): Promise<IUser> => {
  const deletedUser: IUser | null = await User.findByIdAndRemove(id)
  if (!deletedUser) {
    throw new Error("No user found")
  }
  return deletedUser
}

export { findAllUsers, removeUser }