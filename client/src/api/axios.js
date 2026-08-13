import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // Fails loudly during development if the env var is missing, instead of
  // silently sending requests to a broken relative URL.
  console.error("VITE_API_URL is not set. Check your client/.env file.");
}

const api = axios.create({
  baseURL: API_URL,
});

// Attach the JWT (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillnest_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
