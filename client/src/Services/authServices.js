import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const ADMIN_API_URL = "http://localhost:5000/api/admin";

//Authentication
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//User Profile
export const getProfile = async () => {
  const response = await axios.get(
    `${API_URL}/profile`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axios.put(
    `${API_URL}/update-profile`,
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axios.put(
    `${API_URL}/change-password`,
    passwordData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//Admin
export const getAllUsers = async () => {
  const response = await axios.get(
    `${ADMIN_API_URL}/users`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${ADMIN_API_URL}/users/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//Password Reset
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (
  token,
  password
) => {
  const response = await axios.put(
    `${API_URL}/reset-password/${token}`,
    { password }
  );
  return response.data;
};