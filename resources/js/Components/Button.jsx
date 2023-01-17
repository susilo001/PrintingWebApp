const Button = ({ children, className, type, onClick, ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`btn ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
