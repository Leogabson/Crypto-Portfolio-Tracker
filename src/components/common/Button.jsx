const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary:
      "bg-dark-800 hover:bg-dark-700 text-dark-50 border border-dark-700",
    ghost: "hover:bg-dark-800 text-dark-200",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-gain hover:bg-emerald-600 text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
