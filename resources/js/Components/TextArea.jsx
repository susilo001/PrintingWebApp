export default function TextArea({
  name,
  id,
  value,
  placeholder,
  label,
  className,
  autoComplete,
  required,
  error,
}) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        className={`textarea ${className}`}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
        value={value}
        autoComplete={autoComplete}
      ></textarea>
      <label className="label">
        <span className="label-text">{error}</span>
      </label>
    </div>
  );
}
