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
  const imagePath = req.files?.image?.path;
  if (!imagePath) {
    throw new ApiError(400, "Main image is required");
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
    .json(new ApiResponse(201, "Product created successfully", product));
};

export { createProduct };
