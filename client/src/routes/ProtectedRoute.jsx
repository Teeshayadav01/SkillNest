import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

// requireRole: "admin" | "student" | undefined (any authenticated user)
export default function ProtectedRoute({ children, requireRole }) {
  const { status, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (status === "checking") {
    return <Loader label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
