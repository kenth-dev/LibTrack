import axios, { type AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const detail = error.response?.data?.detail;
    return Promise.reject(new Error(detail || error.message));
  }
);

export default api;