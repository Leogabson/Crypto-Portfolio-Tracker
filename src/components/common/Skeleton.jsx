const Skeleton = ({
  width = "100%",
  height = "20px",
  variant = "rectangular",
  count = 1,
  className = "",
}) => {
  const baseStyles = "animate-pulse bg-dark-800";

  const variants = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded h-4",
  };

  const skeletonStyle = {
    width,
    height: variant === "text" ? "1rem" : height,
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            style={skeletonStyle}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={skeletonStyle}
    />
  );
};

export default Skeleton;
