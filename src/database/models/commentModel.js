import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    blogId: {
      type: ObjectId,
      required: true,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);

export const commentModel =
  mongoose?.models?.comment || mongoose.model("comment", commentSchema);
