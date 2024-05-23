import mongoose, { Schema } from "mongoose";

const variantSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  boxPerCase: {
    type: Number,
    required: true,
  },
  unitsPerBox: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

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
      type: String,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    variants: {
      type: [variantSchema],
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
