import Category from "../models/category.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, description = "", icon = "", color = "#000000" } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new ApiError(400, "Category name is required");
  }

  const normalizedName = name.trim();
  const slug = normalizedName.toLowerCase().replace(/\s+/g, "-");

  try {
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(200).json(
        new ApiResponse(200, existingCategory, "Category already exists")
      );
    }

    const category = await Category.create({
      name: normalizedName,
      slug,
      description,
      icon,
      color,
    });

    return res.status(201).json(
      new ApiResponse(201, category, "Category created successfully")
    );
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      throw new ApiError(503, "Database unavailable. Please try again later.");
    }
    throw error;
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 }).lean();

    if (!Array.isArray(categories)) {
      throw new ApiError(500, "Invalid categories data");
    }

    if (!categories.length) {
      return res.status(200).json(new ApiResponse(200, [], "No categories found"));
    }

    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      throw new ApiError(503, "Database unavailable. Please try again later.");
    }
    throw error;
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Category ID is required");
  }

  try {
    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      throw new ApiError(503, "Database unavailable. Please try again later.");
    }
    throw error;
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, icon, color } = req.body ?? {};

  if (!id) {
    throw new ApiError(400, "Category ID is required");
  }

  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "") {
        throw new ApiError(400, "Category name cannot be empty");
      }
      category.name = name.trim();
      category.slug = name.trim().toLowerCase().replace(/\s+/g, "-");
    }

    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (color !== undefined) category.color = color;

    const updatedCategory = await category.save();

    return res.status(200).json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      throw new ApiError(503, "Database unavailable. Please try again later.");
    }
    throw error;
  }
});














export { createCategory, getAllCategories, getCategoryById, updateCategory };
export default { createCategory, getAllCategories, getCategoryById, updateCategory };