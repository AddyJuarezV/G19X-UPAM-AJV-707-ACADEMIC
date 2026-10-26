export default function UserChip({
  title,
  subtitle,
  avatar,
}) {
  return (
    <div className="user-chip">
      <div className="avatar">
        {avatar}
      </div>

      <div>
        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
