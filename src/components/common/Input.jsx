const Input = ({
  label = null,
  error = null,
  leftIcon = null,
  rightIcon = null,
  helperText = null,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "bg-dark-900 border border-dark-700 text-dark-50 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";
  const errorStyles = error ? "border-loss focus:ring-loss" : "";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`${baseStyles} ${errorStyles} ${leftIcon ? "pl-10" : ""} ${
            rightIcon ? "pr-10" : ""
          }`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-loss text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-dark-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
