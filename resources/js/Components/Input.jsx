const Input = ({
    name,
    label,
    error,
    type,
    placeholder,
    onChange,
    value,
    className,
}) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                autoComplete="true"
                className={`input ${className}`}
            />
            <label className="label">
                <span className="label-text-alt">{error}</span>
            </label>
        </div>
    );
};

export default Input;
