import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const blogModel =
  mongoose?.models?.blog || mongoose.model("blog", blogSchema);
