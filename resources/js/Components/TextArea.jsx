import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
  {
    name,
    id,
    value,
    placeholder,
    label,
    className,
    autoComplete,
    required,
    error,
    handleChange,
    isFocused,
  },
  ref
) {
  const textarea = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      textarea.current.focus();
    }
  }, []);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        className={`textarea ${className}`}
        placeholder={placeholder}
        name={name}
        ref={textarea}
        id={id}
        required={required}
        value={value}
        onChange={(e) => handleChange(e)}
        autoComplete={autoComplete}
      />
      <label className="label">
        <span className="label-text">{error}</span>
      </label>
    </div>
  );
});
