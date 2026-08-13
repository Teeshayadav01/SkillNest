export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark" aria-hidden="true">
        <NestMark />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}

// Small reusable version of the brand mark, used to keep empty states
// on-brand instead of a generic icon.
function NestMark() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <circle cx="24" cy="24" r="20" stroke="var(--line)" strokeWidth="2" />
      <circle cx="24" cy="24" r="13" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="24" cy="24" r="6" fill="var(--accent)" />
    </svg>
  );
}
