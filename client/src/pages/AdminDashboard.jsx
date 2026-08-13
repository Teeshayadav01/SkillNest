import { useEffect, useState } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api/courses";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import CourseFormModal from "../components/CourseFormModal";
import ConfirmModal from "../components/ConfirmModal";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create"); // "create" | "edit"
  const [editingCourse, setEditingCourse] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadCourses = () => {
    setLoading(true);
    setError("");
    return getCourses()
      .then(setCourses)
      .catch((err) => setError(err?.response?.data?.message || "Could not load courses right now."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openCreate = () => {
    setFormMode("create");
    setEditingCourse(null);
    setFormOpen(true);
  };

  const openEdit = (course) => {
    setFormMode("edit");
    setEditingCourse(course);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values) => {
    if (formMode === "edit") {
      const updated = await updateCourse(editingCourse._id, values);
      setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    } else {
      const created = await createCourse(values);
      setCourses((prev) => [created, ...prev]);
    }
    setFormOpen(false);
  };

  const confirmDelete = (course) => setDeleteTarget(course);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCourse(deleteTarget._id);
      setCourses((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this course right now.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page">
      <div className="page__header page__header--row">
        <div>
          <h1>Admin dashboard</h1>
          <p>Create, edit, and remove courses on SkillNest.</p>
        </div>
        <button className="btn btn--primary" onClick={openCreate}>
          + New course
        </button>
      </div>

      {loading && <Loader label="Loading courses..." />}
      <ErrorMessage message={error} />

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          title="No courses yet"
          message="Create your first course to get SkillNest started."
          action={
            <button className="btn btn--primary" onClick={openCreate}>
              + New course
            </button>
          }
        />
      )}

      {!loading && courses.length > 0 && (
        <div className="admin-table">
          <div className="admin-table__head">
            <span>Title</span>
            <span>Duration</span>
            <span>Price</span>
            <span>Actions</span>
          </div>
          {courses.map((course) => (
            <div className="admin-table__row" key={course._id}>
              <span className="admin-table__title">{course.title}</span>
              <span>{course.duration || "—"}</span>
              <span>{course.price && course.price > 0 ? `₹${course.price}` : "Free"}</span>
              <span className="admin-table__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => openEdit(course)}>
                  Edit
                </button>
                <button className="btn btn--danger btn--sm" onClick={() => confirmDelete(course)}>
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      <CourseFormModal
        open={formOpen}
        mode={formMode}
        initialValues={editingCourse}
        onSubmit={handleFormSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this course?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed. This can't be undone.`
            : ""
        }
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
