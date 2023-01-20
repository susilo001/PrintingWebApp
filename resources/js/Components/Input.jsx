import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function Input(
  {
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
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

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
        autoComplete="true"
        required={required}
        className={`input ${className}`}
      />
      <div className="mt-4">
        <p className="text-error text-xs">{errors ? <p>{errors}</p> : null}</p>
      </div>
    </div>
  );
});
