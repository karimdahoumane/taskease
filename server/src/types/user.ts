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
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export enum EUserRole {
  Admin = "ADMIN",
  User = "USER",
}