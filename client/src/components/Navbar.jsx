import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <NestMark />
          <span>SkillNest</span>
        </Link>

        <nav className="navbar__links">
          <NavLink to="/courses" className="navbar__link">
            Courses
          </NavLink>

          {isAuthenticated && !isAdmin && (
            <NavLink to="/dashboard" className="navbar__link">
              My Dashboard
            </NavLink>
          )}

          {isAuthenticated && isAdmin && (
            <NavLink to="/admin" className="navbar__link">
              Admin
            </NavLink>
          )}

          {!isAuthenticated && (
            <>
              <NavLink to="/login" className="navbar__link">
                Login
              </NavLink>
              <Link to="/register" className="btn btn--primary btn--sm">
                Get started
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className="navbar__user">
              <span className="navbar__role">{user?.role}</span>
              <span>{user?.name}</span>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

function NestMark() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none">
      <circle cx="24" cy="24" r="20" stroke="var(--brand)" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="13" stroke="var(--brand)" strokeWidth="2.5" opacity="0.6" />
      <circle cx="24" cy="24" r="6" fill="var(--accent)" />
    </svg>
  );
}
