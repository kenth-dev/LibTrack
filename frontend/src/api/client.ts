import axios, { type AxiosError } from 'axios';

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const detail = error.response?.data?.detail;
    return Promise.reject(new Error(detail || error.message));
  }
);

export function resolveApiUrl(path?: string | null): string {
  if (!path) {
    return '';
  }

  return new URL(path, apiBaseUrl).toString();
}

export default api;