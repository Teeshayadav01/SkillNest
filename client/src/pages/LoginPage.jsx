import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const user = await login(form.email.trim(), form.password);
      const redirectTo = location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-card__sub">Log in to continue learning.</p>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <span className="field__error">{errors.email}</span>}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
            {errors.password && <span className="field__error">{errors.password}</span>}
          </label>

          <ErrorMessage message={serverError} />

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-card__footer">
          New to SkillNest? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
