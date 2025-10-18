import axios from 'axios';
import { constants } from '../constants/constants';

const API_BASE_URL = import.meta.env.VITE_API_SERVER_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(constants.AUTH_TOKEN) || null;
    const userId = localStorage.getItem(constants.USER_ID) || null;

    config.headers['X-Auth-Token'] = authToken;
    config.headers['X-User-Id'] = userId;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // pass successful responses as-is
  (error) => {
    console.log(error)
    // Extract custom error message if available
    const message =
      error?.response?.data?.error ||    // Backend error message
      error?.response?.data?.message ||  // Alternate message key
      error?.message ||                  // Axios generic error
      'An unknown error occurred.';      // Fallback

    // Reject with simplified Error
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
