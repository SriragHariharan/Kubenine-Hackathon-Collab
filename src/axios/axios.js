import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_SERVER_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken') || null;
    const userId = localStorage.getItem('userId') || null;

    // Attach token or null explicitly
    config.headers['X-Auth-Token'] = authToken;
    config.headers['X-User-Id'] = userId;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
