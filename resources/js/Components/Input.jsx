import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function Input({
  id,
  name,
  label,
  isFocused,
  type,
  placeholder,
  handleChange,
  value,
  className,
  required,
  errors,
  defaultValue,
  disabled
}, ref) {
  const input = ref || useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="form-control w-full">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        name={name}
        ref={input}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        value={value}
        disabled={disabled}
        autoComplete="true"
        required={required}
        defaultValue={defaultValue}
        className={`input ${className}`}
      />
      <div className="mt-4">
        <p className="text-error text-xs">{errors && <span>{errors}</span>}</p>
      </div>
    </div>
  );
});
