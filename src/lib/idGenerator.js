// generateProductId.js
import { Counter } from "../models/counter.model.js";

const generateProductId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "productId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return `P${counter.value.toString().padStart(5, "0")}`;
};

export { generateProductId };
