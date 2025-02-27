import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Automatically attach token (if available) to every request
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
