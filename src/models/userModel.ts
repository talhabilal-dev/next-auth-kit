import mongoose, { Schema, model, Document, Model, models } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  bio?: string;
  username: string;
  email: string;
  _id: mongoose.Types.ObjectId;
  password: string;
  createdAt: Date;
  isVerified: boolean;
  isAdmin: boolean;
  forgetToken?: string;
  forgetTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: [true, "First name is required."],
    minlength: [2, "First name must be at least 2 characters."],
    maxlength: [30, "First name must be at most 30 characters."],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Last name is required."],
    minlength: [2, "Last name must be at least 2 characters."],
    maxlength: [30, "Last name must be at most 30 characters."],
    trim: true,
  },
  bio: {
    type: String,
    required: false,
    maxlength: [160, "Bio must be at most 160 characters."],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    minlength: [3, "Username must be at least 3 characters."],
    maxlength: [30, "Username must be at most 30 characters."],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters."],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetToken: {
    type: String,
    select: false,
  },
  forgetTokenExpiry: {
    type: Date,
    select: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpiry: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = models.User
  ? (models.User as Model<IUser>)
  : model<IUser>("User", userSchema);

export default User;
