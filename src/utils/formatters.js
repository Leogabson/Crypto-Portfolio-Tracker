/**
 * Format a number as currency
 * @param {number} value - The number to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = "USD", decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return "$0.00";

  // Handle very small values
  if (Math.abs(value) < 0.01 && value !== 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(value);
  }

  // Handle large values with abbreviations
  if (Math.abs(value) >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format market cap or large numbers with abbreviations
 * @param {number} value - The number to format
 * @returns {string} Formatted string with K, M, B, T suffixes
 */
export const formatMarketCap = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "N/A";

  const absValue = Math.abs(value);

  if (absValue >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (absValue >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }

  return formatCurrency(value, "USD", 2);
};

/**
 * Format percentage values
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return "0.00%";

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers with commas
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return "0";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format volume with abbreviations
 * @param {number} value - The volume to format
 * @returns {string} Formatted volume string
 */
export const formatVolume = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "$0";

  const absValue = Math.abs(value);

  if (absValue >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }

  return formatCurrency(value, "USD", 0);
};

/**
 * Format date to readable string
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "short") => {
  if (!date) return "N/A";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const options = {
    short: { month: "short", day: "numeric", year: "numeric" },
    long: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
    time: { hour: "2-digit", minute: "2-digit" },
    datetime: {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Intl.DateTimeFormat(
    "en-US",
    options[format] || options.short
  ).format(dateObj);
};

/**
 * Format time ago (relative time)
 * @param {Date|string|number} date - Date to format
 * @returns {string} Relative time string (e.g., "2 hours ago")
 */
export const formatTimeAgo = (date) => {
  if (!date) return "N/A";

  const dateObj = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now - dateObj) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/**
 * Format crypto amount (handles small decimals properly)
 * @param {number} value - The crypto amount
 * @param {number} maxDecimals - Maximum decimal places
 * @returns {string} Formatted crypto amount
 */
export const formatCryptoAmount = (value, maxDecimals = 8) => {
  if (value === null || value === undefined || isNaN(value)) return "0";

  // For very small values, show more decimals
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toFixed(maxDecimals);
  }

  // For small values, show appropriate decimals
  if (Math.abs(value) < 1) {
    return value.toFixed(6);
  }

  // For larger values, show fewer decimals
  if (Math.abs(value) >= 1000) {
    return formatNumber(value, 2);
  }

  return formatNumber(value, 4);
};

/**
 * Shorten wallet address
 * @param {string} address - Wallet address
 * @param {number} start - Characters to show at start
 * @param {number} end - Characters to show at end
 * @returns {string} Shortened address
 */
export const shortenAddress = (address, start = 6, end = 4) => {
  if (!address) return "";
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

/**
 * Format change value with color indicator
 * @param {number} value - The change value
 * @returns {object} Object with formatted value and color class
 */
export const formatChange = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return { text: "0.00%", color: "text-dark-400", isPositive: false };
  }

  const isPositive = value >= 0;

  return {
    text: formatPercent(value),
    color: isPositive ? "text-gain" : "text-loss",
    isPositive,
  };
};

/**
 * Format supply (circulating, total, max)
 * @param {number} value - Supply value
 * @returns {string} Formatted supply string
 */
export const formatSupply = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "N/A";

  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }

  return formatNumber(value, 0);
};

/**
 * Parse string to number safely
 * @param {string|number} value - Value to parse
 * @returns {number|null} Parsed number or null
 */
export const parseNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const cleaned = value.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? null : parsed;
};
