// models/Counter.js
import mongoose, { Schema } from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

export const Counter = mongoose.model("Counter", counterSchema);
