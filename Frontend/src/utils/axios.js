import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance with common configurations
const axiosInstance = axios.create({
  baseURL: "/api", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      Cookies.remove("jwt");
      localStorage.removeItem("Auth");

      // Redirect to login8
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
