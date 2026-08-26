import api from "../api/axios";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

// Get logged-in user
export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};