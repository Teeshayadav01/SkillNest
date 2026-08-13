import { useEffect, useState } from "react";
import { getCourses } from "../api/courses";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCourses()
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch((err) => {
        if (active) setError(err?.response?.data?.message || "Could not load courses right now.");
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
        <h1>All courses</h1>
        <p>Browse everything currently available on SkillNest.</p>
      </div>

      {loading && <Loader label="Loading courses..." />}
      <ErrorMessage message={error} />

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          title="No courses yet"
          message="Check back soon — new courses are added regularly."
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
