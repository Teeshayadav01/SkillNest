import api from "./axios";

// Matches: POST /api/auth/register -> { token, user }
export const registerRequest = (payload) => api.post("/api/auth/register", payload).then((res) => res.data);

// Matches: POST /api/auth/login -> { token, user }
export const loginRequest = (payload) => api.post("/api/auth/login", payload).then((res) => res.data);

// Matches: GET /api/auth/me -> { user }
export const getMeRequest = () => api.get("/api/auth/me").then((res) => res.data);
