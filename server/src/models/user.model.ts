import { IUser } from "../types/user"
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Users"
  }
)

export default model<IUser>("User", userSchema)