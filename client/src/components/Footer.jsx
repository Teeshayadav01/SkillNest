export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>© {new Date().getFullYear()} SkillNest</span>
        <span>Short courses & workshops for curious people</span>
      </div>
    </footer>
  );
}
