import api from "../api/axios";

/**
 * Get all categories
 */
export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);

  return response.data;
};

/**
 * Create category
 */
export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);

  return response.data;
};

/**
 * Update category
 */
export const updateCategory = async (categoryId, categoryData) => {
  const response = await api.patch(
    `/categories/${categoryId}`,
    categoryData
  );

  return response.data;
};