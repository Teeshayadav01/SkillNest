import { Link } from "react-router-dom";

export default function CourseCard({ course, footer }) {
  return (
    <article className="course-card">
      <div className="course-card__rail" aria-hidden="true" />
      <div className="course-card__body">
        <h3>
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
        </h3>
        <p className="course-card__desc">{course.description}</p>
        <div className="course-card__meta">
          {course.duration && <span className="pill">{course.duration}</span>}
          <span className="pill pill--accent">
            {course.price && course.price > 0 ? `₹${course.price}` : "Free"}
          </span>
        </div>
        {footer && <div className="course-card__footer">{footer}</div>}
      </div>
    </article>
  );
}
