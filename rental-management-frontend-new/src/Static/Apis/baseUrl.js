import axios from "axios";
import { Token } from "../../Utils/tokenUtils";
import { getDomainBaseUrl } from "../../Utils/utils";
import { generateAccessTokenCall } from "../Apis";

// base api url configuration
export const BACKEND_BASE_URL = process.env.REACT_APP_API_URL;
export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: false,
});

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "multi-part/formdata";

axiosInstance.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem('Token'))?.ACCESS_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it as-is
    return response;
  },
  async (error) => {
    const configureSet = error.config;
    // Check if the error is a 401 Unauthorized or 403 Forbidden error
    if (error.response && error.response.status === 401) {
      if (
        error.response?.data?.messages &&
        error.response?.data?.messages[0]?.token_type === "access"
      ) {
        const refresh = JSON.parse(localStorage.getItem('Token'))?.REFRESH_TOKEN;
        configureSet._retry = true;

        try {
          const { data } = await generateAccessTokenCall({ 'refresh': refresh });
          const newAccessToken = data?.access_token;
          const newRefreshToken = data?.refresh_token;
          if (newAccessToken && newRefreshToken) {
            let tokenData = JSON.parse(localStorage.getItem('Token'))
            tokenData.ACCESS_TOKEN = newAccessToken
            tokenData.REFRESH_TOKEN = newRefreshToken
            localStorage.setItem('Token', JSON.stringify(tokenData));
          }
          configureSet._retry = false;
          return axiosInstance(configureSet);
        } catch (error) {
          console.log('error: ', error);
          console.log(error?.response?.data?.code,"datadaerrorerrorta",error?.response?.data?.detail)
          if(error?.response?.data?.code === "token_not_valid" && error?.response?.data?.detail === "Token is invalid or expired"){
            localStorage.removeItem('Token')
            // const baseDomain = getDomainBaseUrl()
            // console.log('Base Domain:', baseDomain);
            window.location.reload()
            // window.open(`${baseDomain}/`)
          }else {
            // Handle the error while generating a new access token
            return Promise.reject(error);
          }
        }
      }
    }

    // Return the error to be further handled by the calling code
    return Promise.reject(error);
  }
);