import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    parentId: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
