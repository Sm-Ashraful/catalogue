import { nanoid } from "nanoid";
import slugify from "slugify";
import { Category } from "../models/category.model.js";

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
    throw new Error("Name is required");
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
  const categories = await Category.find({});
  const categoryList = createCategories(categories);
  return res
    .status(200)
    .json({ message: "All categories", data: categoryList });
};

export { addCategory, getCategories };
