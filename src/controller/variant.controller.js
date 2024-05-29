import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { generateProductId } from "../lib/idGenerator.js";
import { Product } from "../models/product.model.js";
import { Variant } from "../models/variants.model.js";
import { ApiError } from "../utils/ApiError.js";

const createVariant = async (req, res) => {
  const { boxPerCase, unitsPerBox, product, stock, customProperties } =
    req.body;

  const productName = await Product.findById(product);

  if (!productName) {
    console.log("Category does not exist");
  }

  // Check if user has uploaded a main image\
  const imagePath = req.files?.image[0]?.path;

  if (!imagePath) {
    throw new ApiError(400, "Image is required");
  }
  let productId;
  if (!req.body.productId) {
    productId = await generateProductId();
  } else {
    productId = req.body.productId;
  }

  const imageRes = await uploadOnCloudinary(imagePath);

  const variant = await Variant.create({
    product: productName,
    productId: productId,
    image: {
      url: imageRes.url,
    },
    boxPerCase,
    unitsPerBox,
    stock,
    customProperties,
  });

  return res
    .status(201)
    .json({ message: "Product created successfully", data: variant });
};

const getVariants = async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    throw new ApiError(400, "productId is required");
  }
  const product = productId.toString();

  // Find variants based on productId
  const variants = await Variant.find({ product: product });

  if (variants.length === 0) {
    return res
      .status(404)
      .json({ message: "No variants found for the given productId" });
  }

  // Return the found variants
  res
    .status(200)
    .json({ message: "Variants fetched successfully", data: variants });
};

export { createVariant, getVariants };
