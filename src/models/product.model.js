import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
    },
    image: {
      type: {
        url: String,
      },
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: {
      ref: "Category",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
