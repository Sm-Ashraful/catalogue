import { nanoid } from "nanoid";
import slugify from "slugify";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (!parentId) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      image: cate.image,
      parentId: cate.parentId,

      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    slug: `${slugify(req.body.name)}-${nanoid()}`,
    parentId: req.body?.parentId,
  });

  return res
    .status(201)
    .json({ message: "Category Created Successfully.", data: category });
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    const categoryList = createCategories(categories);

    // Find the index of the specific category
    const specificCategoryId = "6657f63b463fc6e49c7da8b4";
    const specificCategoryIndex = categoryList.findIndex(
      (category) => category._id === specificCategoryId
    );

    if (specificCategoryIndex) {
      // Remove the specific category from its current position
      const [specificCategory] = categoryList.splice(specificCategoryIndex, 1);

      // Insert the specific category at the 5th index
      categoryList.splice(4, 0, specificCategory);
    }

    return res
      .status(200)
      .json({ message: "All categories", data: categoryList });
  } catch (error) {
    throw new ApiError(404, "Something went wrong");
  }
};

const getCategory = async (req, res) => {
  const { categoryId } = req.body;
  console.log("Category id: ", categoryId);
  const category_id = categoryId.toString();

  try {
    const category = await Category.find({ _id: category_id });
    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category found", data: category });
  } catch (error) {
    console.log("Erorr: ", error);
    throw new ApiError(500, "Internal server error");
  }
};

export { addCategory, getCategories, getCategory };
