import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <section className="hero">
        <div className="hero__inner">
          <p className="eyebrow">Short courses & workshops</p>
          <h1>
            Learn a real skill <span>this week,</span> not someday.
          </h1>
          <p className="hero__sub">
            SkillNest gathers focused, short-format courses and workshops in one place, so you can
            pick something up quickly and actually finish it.
          </p>
          <div className="hero__actions">
            <Link to="/courses" className="btn btn--primary btn--lg">
              Browse courses
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn--ghost btn--lg">
                Create a free account
              </Link>
            )}
          </div>
        </div>
        <div className="hero__mark" aria-hidden="true">
          <NestGraphic />
        </div>
      </section>

      <section className="section">
        <div className="section__inner grid-3">
          <FeatureCard
            title="Bite-sized courses"
            body="Every course on SkillNest is scoped to be finished in days, not months."
          />
          <FeatureCard
            title="Track what you've started"
            body="Your dashboard shows every course you've enrolled in, in one place."
          />
          <FeatureCard
            title="Built by real instructors"
            body="Courses are added and maintained by SkillNest admins, kept current and useful."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, body }) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function NestGraphic() {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none">
      <circle cx="150" cy="150" r="120" stroke="var(--line)" strokeWidth="2" />
      <circle cx="150" cy="150" r="90" stroke="var(--brand)" strokeWidth="2" opacity="0.5" />
      <circle cx="150" cy="150" r="60" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="150" cy="150" r="24" fill="var(--accent)" />
    </svg>
  );
}
