import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyEnrollments } from "../api/enrollments";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getMyEnrollments()
      .then((data) => {
        if (active) setEnrollments(data);
      })
      .catch((err) => {
        if (active) setError(err?.response?.data?.message || "Could not load your dashboard right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page">
      <div className="page__header">
        <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p>Here's what you're currently learning.</p>
      </div>

      {loading && <Loader label="Loading your courses..." />}
      <ErrorMessage message={error} />

      {!loading && !error && enrollments.length === 0 && (
        <EmptyState
          title="You haven't enrolled in anything yet"
          message="Browse the course catalog and enroll in something that looks interesting."
          action={
            <Link to="/courses" className="btn btn--primary">
              Browse courses
            </Link>
          }
        />
      )}

      {!loading && !error && enrollments.length > 0 && (
        <div className="course-grid">
          {enrollments.map((enrollment) => (
            <CourseCard
              key={enrollment._id}
              course={enrollment.course}
              footer={
                <span className="pill pill--muted">
                  Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </span>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
