import api from "./axios";

// Matches: GET /api/courses -> [course]
export const getCourses = () => api.get("/api/courses").then((res) => res.data);

// Matches: GET /api/courses/:id -> course
export const getCourseById = (id) => api.get(`/api/courses/${id}`).then((res) => res.data);

// Matches: POST /api/courses (admin) -> course
export const createCourse = (payload) => api.post("/api/courses", payload).then((res) => res.data);

// Matches: PUT /api/courses/:id (admin) -> course
export const updateCourse = (id, payload) => api.put(`/api/courses/${id}`, payload).then((res) => res.data);

// Matches: DELETE /api/courses/:id (admin) -> { message }
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`).then((res) => res.data);
