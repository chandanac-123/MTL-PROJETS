import axios from "axios";

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, multipart/form-data",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const token = localStorage.getItem("access_token"); // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with the response data
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
      // Perform any logout actions or redirect to login page
      if (
        error?.response?.data?.message === "No auth token" ||
        error?.response?.data?.message === "jwt expired"
      ) {
        //  Redirect to login page
        localStorage.removeItem("access_token");
        document.cookie = "access_token=; Max-Age=0; path=/;";
        window.location.href = "/";
      }

      // Redirect to login page
      // if (typeof window !== "undefined") {
      //   window.location.href = "/"; // Redirect to the login page
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
