import axios from "axios";
import { splitUrlEndPoint } from "../Functions/utils";

export const httpinstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

httpinstance.interceptors.request.use(async (request) => {
  const token = JSON.parse(localStorage.getItem("auth")).access;
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

httpinstance.interceptors.response.use(
  async (responce) => {
    return responce;
  },
  async (error) => {
    const originalConfig = error.config;
    if (
      splitUrlEndPoint(originalConfig.url) !== "/auth/login" &&
      error.response
    ) {
      // Access Token was expired
      switch (error.response.status) {
        case 401:
          try {
            let auth_values = localStorage.getItem("auth");
            if (auth_values) {
              let values = JSON.parse(auth_values);
              axios
                .post(
                  process.env.REACT_APP_BASE_URL + "/api/auth/token/refresh/",
                  {
                    refresh: values.refresh,
                  }
                )
                .then((response) => {
                  // Handle the successful response
                  if (response.data?.detail === "Token is invalid or expired") {
                    // localStorage.removeItem("auth");
                    // window.location.replace(`${window.location.origin}/auth/login`);
                  } else {
                    // values.refresh = response.data?.refresh
                    values.access = response.data?.access;
                    localStorage.setItem("auth", JSON.stringify(values));
                  }
                })
                .catch((error) => {
                  // Handle errors
                  console.error("Error:", error.response.data?.detail);
                  if (
                    error?.response?.data?.detail ===
                    "Token is invalid or expired"
                  ) {
                    localStorage.removeItem("auth");
                    window.location.replace(
                      `${window.location.origin}/auth/login`
                    );
                  }
                  return Promise.reject(error);
                });
            }

            originalConfig._retry = true;
            return httpinstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        case 402:
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          // window.location.replace(`${window.location.origin}/auth/login`);
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const httpinstancefile = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

httpinstancefile.interceptors.request.use(async (request) => {
  const token = JSON.parse(localStorage.getItem("auth")).access;
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

httpinstancefile.interceptors.response.use(
  async (responce) => {
    return responce;
  },
  async (error) => {
    const originalConfig = error.config;
    const user = JSON.parse(localStorage.getItem("user"));

    if (originalConfig.url !== "/auth/login" && error.response) {
      // Access Token was expired
      // switch(error.response.data.statusCode){
      //     case 401:
      //         try {
      //             const rs = await httpinstance.post("/auth/refresh_token", {"userId" : user.id});
      //             let accessToken = rs?.data?.data?.original?.access_token;
      //             localStorage.setItem("accessToken", accessToken);
      //             originalConfig._retry = true;
      //             return httpinstance(originalConfig);
      //         } catch (_error) {
      //             return Promise.reject(_error);
      //         }
      //     case 402:
      //         localStorage.removeItem("accessToken")
      //         localStorage.removeItem("user")
      //         window.location.replace(`${window.location.origin}/auth/login`);
      //         break;
      //     default :
      //         return Promise.reject(error)
      // }
    }
    return Promise.reject(error);
  }
);
