export default function EmptyState({
  title,
  text,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        ✓
      </div>

      <strong>
        {title}
      </strong>

      <p>
        {text}
      </p>
    </div>
  );
}
