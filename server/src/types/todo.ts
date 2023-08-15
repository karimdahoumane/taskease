import { Document } from 'mongoose';
import { IUser } from './user';

export interface ITodo extends Document {
  name: string;
  description: string;
  done: boolean;
  user_id: IUser['_id'];
}