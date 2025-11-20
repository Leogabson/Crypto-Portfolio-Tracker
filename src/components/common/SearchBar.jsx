import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  fullWidth = false,
  className = "",
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange({ target: { value: "" } });
    }
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""} ${className}`}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-dark-900 border border-dark-700 text-dark-50 rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-dark-50 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
