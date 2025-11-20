const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium";

  const variants = {
    default: "bg-dark-800 text-dark-200 border border-dark-700",
    success: "bg-gain/10 text-gain border border-gain/20",
    error: "bg-loss/10 text-loss border border-loss/20",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    info: "bg-primary-500/10 text-primary-400 border border-primary-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
