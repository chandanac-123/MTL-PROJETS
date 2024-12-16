import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json ,multipart/formdata'
    }
});

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = JSON.parse(localStorage.getItem('token'))?.ACCESS_TOKEN;
    if (accessToken) {
        config.headers['x-access-token'] = accessToken;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            if (!originalRequest._retry && error.response.data.message === 'Invalid credentials') {
                return Promise.reject(error);
            } else if (!originalRequest._retry && error.response.data.message === 'User not found') {
                return Promise.reject(error);
            } else {
                originalRequest._retry = true;
                localStorage.removeItem('token')
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
