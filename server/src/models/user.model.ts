import { IUser, EUserRole } from "../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(EUserRole),
      default: EUserRole.User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Users"
  }
)

export default model<IUser>("User", userSchema)