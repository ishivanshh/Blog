import Blog from "../models/blog.models.js";
import Category from "../models/category.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    content,
    category,
    tags = [],
    coverImage,
    status = "Draft",
    visibility = "Public",
  } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request");
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    throw new ApiError(404, "Category not found");
  }

  const authorExists = await User.findById(req.user._id);
  if (!authorExists) {
    throw new ApiError(404, "Author not found");
  }

  const slugBase = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${slugBase}-${Date.now()}`;

  const blog = await Blog.create({
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    slug,
    coverImage: coverImage || null,
    content: content.trim(),
    author: req.user._id,
    category,
    tags: Array.isArray(tags) ? tags.map((tag) => tag.trim()).filter(Boolean) : [],
    status,
    visibility,
    excerpt: content.trim().slice(0, 160) || null,
  });

  return res.status(201).json(new ApiResponse(201, blog, "Blog created successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    subtitle,
    content,
    category,
    tags,
    coverImage,
    status,
    visibility,
  } = req.body;

  if (!id) {
    throw new ApiError(400, "Blog ID is required");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this blog");
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new ApiError(400, "Title cannot be empty");
    }
    blog.title = title.trim();
    const slugBase = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    blog.slug = `${slugBase}-${Date.now()}`;
  }

  if (subtitle !== undefined) blog.subtitle = subtitle?.trim() || null;
  if (content !== undefined) {
    if (typeof content !== "string" || content.trim() === "") {
      throw new ApiError(400, "Content cannot be empty");
    }
    blog.content = content.trim();
    blog.excerpt = content.trim().slice(0, 160) || null;
  }

  if (category !== undefined) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new ApiError(404, "Category not found");
    }
    blog.category = category;
  }

  if (tags !== undefined) {
    blog.tags = Array.isArray(tags) ? tags.map((tag) => tag.trim()).filter(Boolean) : [];
  }

  if (coverImage !== undefined) blog.coverImage = coverImage || null;
  if (status !== undefined) blog.status = status;
  if (visibility !== undefined) blog.visibility = visibility;

  const updatedBlog = await blog.save();

  return res.status(200).json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

export { createBlog, updateBlog };
export default { createBlog, updateBlog };