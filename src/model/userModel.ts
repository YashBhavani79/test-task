import mongoose from "mongoose";
import { UserStatus } from "../comman/enum";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      default: false
    },
    password: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    userStatus: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.Active
    },
    isVerify: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model("User", UserSchema);
