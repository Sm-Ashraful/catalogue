import mongoose from "mongoose";
import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { customSlugify } from "../lib/customSlug.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";

const createProduct = async (req, res) => {
  const { name, category } = req.body;

  const categoryToBeAdded = await Category.findById(category);

  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exist");
  }

  const imagePath = req.files?.image[0]?.path;

  if (!imagePath) {
    throw new ApiError(400, "Image is required");
  }

  const imageRes = await uploadOnCloudinary(imagePath);

  try {
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
  } catch (error) {
    console.log("Erorr produt: ", error);
    throw new ApiError(404, "Something went wrong");
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category", // Unwind the category array to a single object
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    throw new ApiError(404, "Something went wrong");
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.aggregate([
      {
        $match: { category: new mongoose.Types.ObjectId(categoryId) },
      },
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category", // Unwind the category array to a single object
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.log("Error feth: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

export { createProduct, getProducts, getProductsByCategory };
