import api from "../api/axios";

/**
 * Get all blogs
 *
 * Supports:
 * page
 * limit
 * search
 * category
 * sortBy
 * order
 */
export const getBlogs = async (params = {}) => {
  const response = await api.get("/blogs", {
    params,
  });

  return response.data;
};

export const getMyBlogs = async (params = {}) => {
  const response = await api.get("/blogs/my", {
    params,
  });

  return response.data;
};

/**
 * Get single blog by ID
 */
export const getBlogById = async (blogId) => {
  const response = await api.get(`/blogs/${blogId}`);

  return response.data;
};

/**
 * Create a new blog
 *
 * Requires authentication
 */
export const createBlog = async (blogData) => {
  const response = await api.post("/blogs", blogData);

  return response.data;
};

/**
 * Update an existing blog
 *
 * Requires authentication
 */
export const updateBlog = async (blogId, blogData) => {
  const response = await api.put(`/blogs/${blogId}`, blogData);

  return response.data;
};

/**
 * Delete a blog
 *
 * Requires authentication
 */
export const deleteBlog = async (blogId) => {
  const response = await api.delete(`/blogs/${blogId}`);

  return response.data;
};
