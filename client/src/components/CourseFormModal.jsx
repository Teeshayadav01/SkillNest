import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const emptyForm = { title: "", description: "", duration: "", price: 0 };

export default function CourseFormModal({ open, mode, initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initialValues
          ? {
              title: initialValues.title || "",
              description: initialValues.description || "",
              duration: initialValues.duration || "",
              price: initialValues.price ?? 0,
            }
          : emptyForm
      );
      setErrors({});
      setServerError("");
    }
  }, [open, initialValues]);

  if (!open) return null;

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (form.price !== "" && Number(form.price) < 0) next.price = "Price cannot be negative";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        duration: form.duration.trim(),
        price: form.price === "" ? 0 : Number(form.price),
      });
    } catch (err) {
      setServerError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{mode === "edit" ? "Edit course" : "Create a new course"}</h3>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <label className="field">
            <span>Title</span>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Intro to UX Design" />
            {errors.title && <span className="field__error">{errors.title}</span>}
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="What will students learn?"
            />
            {errors.description && <span className="field__error">{errors.description}</span>}
          </label>

          <div className="form__row">
            <label className="field">
              <span>Duration</span>
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 2 weeks" />
            </label>

            <label className="field">
              <span>Price (₹)</span>
              <input
                type="number"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0 for free"
              />
              {errors.price && <span className="field__error">{errors.price}</span>}
            </label>
          </div>

          <ErrorMessage message={serverError} />

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Saving..." : mode === "edit" ? "Save changes" : "Create course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
