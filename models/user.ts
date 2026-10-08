import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  image?: string;
  githubId?: string;//?yaani optional;
  googleId?: string;
  username: string; // for public profile URL: /profile/[username]
  bio?: string;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    githubId: { type: String, unique: true, sparse: true },//sparse: true tells MongoDB to make the unique index apply to documents where this field exists.
    googleId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, maxlength: 300, default: "" },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;