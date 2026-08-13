import api from "./axios";

// Matches: POST /api/enrollments/:courseId -> enrollment
export const enrollInCourse = (courseId) =>
  api.post(`/api/enrollments/${courseId}`).then((res) => res.data);

// Matches: GET /api/enrollments/my -> [enrollment] (course populated)
export const getMyEnrollments = () => api.get("/api/enrollments/my").then((res) => res.data);
