import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { generateProductId } from "../lib/idGenerator.js";
import { Product } from "../models/product.model.js";
import { Variant } from "../models/variants.model.js";

const createVariant = async (req, res) => {
  const { boxPerCase, unitsPerBox, product, stock, customProperties } =
    req.body;

  const productName = await Product.findById(product);

  if (!productName) {
    console.log("Category does not exist");
  }

  // Check if user has uploaded a main image\
  const imagePath = req.files?.image[0]?.path;
  console.log("Image path: ", imagePath);
  if (!imagePath) {
    console.log("Main image is required");
  }
  const productId = await generateProductId();
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

export { createVariant };
