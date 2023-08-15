import User from "../models/user.model"
import { IUser } from "../types/user"
import { NotFoundError } from "../helpers/errors"

const findAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await User.find()
  if (!users) {
    throw new NotFoundError("No users found")
  }
  return users
}

const findUserById = async (id: string): Promise<IUser> => {
  const user: IUser | null = await User.findById(id)
  if (!user) {
    throw new NotFoundError("No user found")
  }
  return user
}

const removeUser = async (id: string): Promise<IUser> => {
  const deletedUser: IUser | null = await User.findByIdAndRemove(id)
  if (!deletedUser) {
    throw new NotFoundError("No user found")
  }
  return deletedUser
}

export { findAllUsers, findUserById, removeUser }