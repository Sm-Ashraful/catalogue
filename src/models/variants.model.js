import mongoose, { Schema } from "mongoose";

const variantSchema = new mongoose.Schema({
  product: {
    ref: "Product",
    required: true,
    type: Schema.Types.ObjectId,
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: {
      url: String,
    },
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
  customProperties: { type: mongoose.Schema.Types.Mixed },
});

export const Variant = mongoose.model("Variant", variantSchema);
