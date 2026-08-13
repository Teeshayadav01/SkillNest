import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page page--narrow page--center">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </div>
  );
}
