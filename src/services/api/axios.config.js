import axios from "axios";
import { API_CONFIG } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add API key if available
    if (API_CONFIG.API_KEY) {
      config.headers["x-cg-demo-api-key"] = API_CONFIG.API_KEY;
    }

    if (config.params) {
      config.params._t = Date.now();
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          throw new Error("Invalid request. Please check your input.");

        case 401:
          console.error("Unauthorized:", data);
          throw new Error("Unauthorized. Please check your API key.");

        case 403:
          console.error("Forbidden:", data);
          throw new Error("Access forbidden.");

        case 404:
          console.error("Not Found:", data);
          throw new Error("Resource not found.");

        case 429:
          console.error("Rate Limit:", data);
          throw new Error("Too many requests. Please try again later.");

        case 500:
        case 502:
        case 503:
        case 504:
          console.error("Server Error:", data);
          throw new Error("Server error. Please try again later.");

        default:
          console.error("Error:", data);
          throw new Error("An error occurred. Please try again.");
      }
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      console.error("Error:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
);

export default axiosInstance;
