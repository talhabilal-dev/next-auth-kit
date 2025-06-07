import { Schema, model, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  isVerified: boolean;
  isAdmin: boolean;
  forgetToken?: string;
  forgetTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
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

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // Replace with real hash comparison in production
  return candidatePassword === this.password;
};

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
