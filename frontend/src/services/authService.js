import api from "../api/axios";

export const registerUser = async (userData) => {
  const response = await api.post("api/v1/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("api/v1/auth/login", credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("api/v1/auth/profile");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("api/v1/auth/logout");
  return response.data;
};
