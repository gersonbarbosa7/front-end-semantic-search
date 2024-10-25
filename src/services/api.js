import axios from 'axios';

// Set your BASE_URL
const BASE_URL = 'http://127.0.0.1:8000';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional)
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent, like adding Authorization headers
    // Example: config.headers.Authorization = `Bearer ${your_token}`;
    console.log('Request sent:', config);
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    console.log('Response received:', response);
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    console.error('Error response:', error.response);
    return Promise.reject(error);
  }
);

export default api;
