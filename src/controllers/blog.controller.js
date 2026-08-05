import Blog from "../models/blog.models.js";
import Category from "../models/category.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
//   console.log("Body:", req.body);
// console.log("File:", req.file);
  const {
    title,
    subtitle,
    content,
    category,
    tags = [],
    coverImage,
    status,
    visibility = "Public",
    publish = false,
  } = req.body ?? {};

  

  const coverImageFile = req.file;

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
  const finalStatus = publish ? "Published" : status || "Draft";

  let coverImageUrl = coverImage;
  if (coverImageFile) {
    coverImageUrl = await uploadOnCloudinary(coverImageFile, {
      folder: "blog-app/cover-images",
      public_id: `blog_${slug}`,
      overwrite: true,
    });
  }

  const blog = await Blog.create({
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    slug,
    coverImage: coverImageUrl || null,
    content: content.trim(),
    author: req.user._id,
    category,
    tags: Array.isArray(tags) ? tags.map((tag) => tag.trim()).filter(Boolean) : [],
    status: finalStatus,
    visibility,
    excerpt: content.trim().slice(0, 160) || null,
  });

  console.log("Blog created:", blog);

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
    publish = false,
  } = req.body ?? {};

  const coverImageFile = req.file;

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

  if (coverImageFile) {
    blog.coverImage = await uploadOnCloudinary(coverImageFile, {
      folder: "blog-app/cover-images",
      public_id: `blog_${blog._id}`,
      overwrite: true,
    });
  } else if (coverImage !== undefined) {
    blog.coverImage = coverImage || null;
  }

  if (status !== undefined) {
    blog.status = publish ? "Published" : status;
  } else if (publish) {
    blog.status = "Published";
  }
  if (visibility !== undefined) blog.visibility = visibility;

  const updatedBlog = await blog.save();

  return res.status(200).json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

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
    throw new ApiError(403, "You are not authorized to delete this blog");
  }

  await Blog.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, {}, "Blog deleted successfully"));
});

const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Blog ID is required");
  }

  const blog = await Blog.findById(id).populate("author", "fullName username email").populate("category", "name slug");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedLimit = Math.max(1, Math.min(50, Number(limit) || 10));
  const skip = (parsedPage - 1) * parsedLimit;

  const query = {};

  if (search && typeof search === "string" && search.trim()) {
    const searchTerm = search.trim();
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
      { subtitle: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder;

  const [blogs, totalBlogs] = await Promise.all([
    Blog.find(query)
      .populate("author", "fullName username email")
      .populate("category", "name slug")
      .sort(sortOptions)
      .skip(skip)
      .limit(parsedLimit),
    Blog.countDocuments(query),
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      blogs,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / parsedLimit),
      },
    }, "Blogs fetched successfully")
  );
});

export { createBlog, updateBlog, deleteBlog, getBlogById, getAllBlogs };
export default { createBlog, updateBlog, deleteBlog, getBlogById, getAllBlogs };