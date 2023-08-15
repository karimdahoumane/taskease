import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: EUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EUserRole {
  Admin = "ADMIN",
  User = "USER",
}