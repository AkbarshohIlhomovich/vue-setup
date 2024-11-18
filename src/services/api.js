// src/services/api.js
import axios from 'axios';

// Base URL for API requests (change to your API base URL)
const API_BASE_URL = 'https://navbatda.uz/services/platon-core/api/';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the auth token if it exists
function attachAuthToken() {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

// Refresh the auth token if expired (example placeholder function)
async function refreshToken() {
  // Assume a refresh token endpoint exists at /auth/refresh
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await api.post('/auth/refresh', { token: refreshToken });
  const { authToken } = response.data;
  localStorage.setItem('authToken', authToken);
  attachAuthToken();
  return authToken;
}

// Request interceptor to attach the token and handle token expiration
api.interceptors.request.use(
  (config) => {
    attachAuthToken();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired, attempt to refresh and retry
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the original request with new token
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        // Optionally, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};
