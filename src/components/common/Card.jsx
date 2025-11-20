const Card = ({
  children,
  title = null,
  subtitle = null,
  headerAction = null,
  hover = false,
  className = "",
  padding = true,
  ...props
}) => {
  const baseStyles = "bg-dark-900 rounded-xl border border-dark-800";
  const hoverStyles = hover
    ? "transition-all duration-300 hover:border-dark-700 hover:shadow-lg cursor-pointer"
    : "";
  const paddingStyles = padding ? "p-6" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-dark-50">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-dark-400 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
