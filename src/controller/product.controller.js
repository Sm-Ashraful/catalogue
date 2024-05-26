import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { customSlugify } from "../lib/customSlug.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";

const createProduct = async (req, res) => {
  const { name, category } = req.body;

  const categoryToBeAdded = await Category.findById(category);

  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exist");
  }

  // Check if user has uploaded a main image\
  const imagePath = req.files?.image[0]?.path;

  if (!imagePath) {
    console.log("Main image is required");
  }

  const imageRes = await uploadOnCloudinary(imagePath);

  const product = await Product.create({
    name,
    slug: customSlugify(name),
    image: {
      url: imageRes.url,
    },
    category,
  });
  return res
    .status(201)
    .json({ message: "Product created successfully", data: product });
};

const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res
    .status(201)
    .json({ message: "Product fetched successfully", data: products });
};

export { createProduct, getProducts };
