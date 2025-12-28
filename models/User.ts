import { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  role: "user" | "admin";
  foodChoice?: string;
  fortunes: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  foodChoice: {
    type: String,
  },
  fortunes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models.User || model<IUser>("User", UserSchema);
