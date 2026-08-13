import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../api/courses";
import { enrollInCourse } from "../api/enrollments";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getCourseById(id)
      .then((data) => {
        if (active) setCourse(data);
      })
      .catch((err) => {
        if (active) {
          setError(
            err?.response?.status === 404
              ? "This course could not be found."
              : "Could not load this course right now."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }
    setEnrolling(true);
    setEnrollError("");
    try {
      await enrollInCourse(id);
      setEnrolled(true);
    } catch (err) {
      if (err?.response?.status === 409) {
        setEnrolled(true); // already enrolled - treat as success state
      } else {
        setEnrollError(err?.response?.data?.message || "Could not enroll right now. Please try again.");
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loader label="Loading course..." />;
  if (error) return <div className="page"><ErrorMessage message={error} /></div>;
  if (!course) return null;

  return (
    <div className="page page--narrow">
      <div className="course-detail">
        <p className="eyebrow">Course</p>
        <h1>{course.title}</h1>

        <div className="course-detail__meta">
          {course.duration && <span className="pill">{course.duration}</span>}
          <span className="pill pill--accent">
            {course.price && course.price > 0 ? `₹${course.price}` : "Free"}
          </span>
        </div>

        <p className="course-detail__description">{course.description}</p>

        {!isAdmin && (
          <div className="course-detail__action">
            {enrolled ? (
              <div className="success-box">You're enrolled in this course. See it on your dashboard.</div>
            ) : (
              <button className="btn btn--primary btn--lg" onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? "Enrolling..." : "Enroll in this course"}
              </button>
            )}
            <ErrorMessage message={enrollError} />
          </div>
        )}

        {isAdmin && (
          <p className="hint">Admin accounts view course details but enroll as a student to test the flow.</p>
        )}
      </div>
    </div>
  );
}
