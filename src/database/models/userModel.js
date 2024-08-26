import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    favorites: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose?.models?.user || mongoose.model("user", userSchema);
