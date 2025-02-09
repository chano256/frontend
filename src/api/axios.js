import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // console.error("API Error Data:", error.response.data);
      // console.error("API Error Status:", error.response.status);

      // if (error.response.status === 401) {
      //   // Unauthorized: Access token is missing or invalid
      //   console.log("Unauthorized: Access token is missing or invalid.");
      //   localStorage.removeItem("access_token");
      //   window.location.href = "/login";
      // } else if (error.response.status === 403) {
      //   // Forbidden: Access token is missing or invalid
      //   console.log("Forbidden: Access token is missing or invalid.");
      //   localStorage.removeItem("access_token");
      //   window.location.href = "/login";
      // }

      return Promise.reject(error.response.data); // Return a custom error message
    } else if (error.request) {
      // request made but no response
      console.error("API Error Request:", error.request);
      console.log("Network error. Please check your internet connection.");
    } else {
      console.error("API Error Message:", error.message);
      console.log("Something went wrong.");
    }
    
    return Promise.reject(error);
  }
);

export default api;
