import { useState } from "react";

const Tooltip = ({ children, content, position = "top", delay = 200 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const showTooltip = () => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    setTimer(timeout);
  };

  const hideTooltip = () => {
    if (timer) clearTimeout(timer);
    setIsVisible(false);
  };

  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positions[position]} z-50 animate-fade-in`}>
          <div className="bg-dark-800 text-dark-50 text-sm px-3 py-2 rounded-lg shadow-lg border border-dark-700 whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
