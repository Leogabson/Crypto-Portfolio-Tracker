/**
 * Validate if a value is a positive number
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid positive number
 */
export const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && isFinite(num);
};

/**
 * Validate if a value is a non-negative number
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid non-negative number
 */
export const isNonNegativeNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

/**
 * Validate cryptocurrency amount
 * @param {string|number} amount - Amount to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateAmount = (amount) => {
  if (!amount || amount === "") {
    return { isValid: false, error: "Amount is required" };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return { isValid: false, error: "Amount must be a valid number" };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: "Amount must be greater than 0" };
  }

  if (!isFinite(numAmount)) {
    return { isValid: false, error: "Amount must be a finite number" };
  }

  if (numAmount > 1e15) {
    return { isValid: false, error: "Amount is too large" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate price value
 * @param {string|number} price - Price to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validatePrice = (price) => {
  if (!price || price === "") {
    return { isValid: false, error: "Price is required" };
  }

  const numPrice = parseFloat(price);

  if (isNaN(numPrice)) {
    return { isValid: false, error: "Price must be a valid number" };
  }

  if (numPrice <= 0) {
    return { isValid: false, error: "Price must be greater than 0" };
  }

  if (!isFinite(numPrice)) {
    return { isValid: false, error: "Price must be a finite number" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate coin ID
 * @param {string} coinId - Coin ID to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateCoinId = (coinId) => {
  if (!coinId || coinId.trim() === "") {
    return { isValid: false, error: "Coin is required" };
  }

  if (typeof coinId !== "string") {
    return { isValid: false, error: "Invalid coin ID format" };
  }

  // CoinGecko IDs are lowercase with hyphens
  const validPattern = /^[a-z0-9-]+$/;
  if (!validPattern.test(coinId)) {
    return { isValid: false, error: "Invalid coin ID format" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email is required" };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate wallet address (basic check)
 * @param {string} address - Wallet address to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateWalletAddress = (address) => {
  if (!address || address.trim() === "") {
    return { isValid: false, error: "Wallet address is required" };
  }

  // Basic validation - most crypto addresses are 26-35 characters
  if (address.length < 26 || address.length > 62) {
    return { isValid: false, error: "Invalid wallet address length" };
  }

  // Check for valid characters (alphanumeric)
  const validPattern = /^[a-zA-Z0-9]+$/;
  if (!validPattern.test(address)) {
    return {
      isValid: false,
      error: "Wallet address contains invalid characters",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate date
 * @param {string|Date} date - Date to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateDate = (date) => {
  if (!date) {
    return { isValid: false, error: "Date is required" };
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: "Invalid date format" };
  }

  const now = new Date();
  if (dateObj > now) {
    return { isValid: false, error: "Date cannot be in the future" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate percentage value
 * @param {string|number} percentage - Percentage to validate
 * @param {number} min - Minimum value (default: -100)
 * @param {number} max - Maximum value (default: 100)
 * @returns {object} Validation result with isValid and error message
 */
export const validatePercentage = (percentage, min = -100, max = 1000) => {
  if (percentage === "" || percentage === null || percentage === undefined) {
    return { isValid: false, error: "Percentage is required" };
  }

  const numPercentage = parseFloat(percentage);

  if (isNaN(numPercentage)) {
    return { isValid: false, error: "Percentage must be a valid number" };
  }

  if (numPercentage < min || numPercentage > max) {
    return {
      isValid: false,
      error: `Percentage must be between ${min}% and ${max}%`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate search query
 * @param {string} query - Search query to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateSearchQuery = (query) => {
  if (!query || query.trim() === "") {
    return { isValid: false, error: "Search query cannot be empty" };
  }

  if (query.length < 2) {
    return {
      isValid: false,
      error: "Search query must be at least 2 characters",
    };
  }

  if (query.length > 100) {
    return { isValid: false, error: "Search query is too long" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate alert price
 * @param {string|number} targetPrice - Target price for alert
 * @param {number} currentPrice - Current market price
 * @returns {object} Validation result with isValid and error message
 */
export const validateAlertPrice = (targetPrice, currentPrice) => {
  const priceValidation = validatePrice(targetPrice);
  if (!priceValidation.isValid) {
    return priceValidation;
  }

  const numTarget = parseFloat(targetPrice);

  // Warning if target is same as current price
  if (Math.abs(numTarget - currentPrice) < currentPrice * 0.001) {
    return {
      isValid: true,
      warning: "Target price is very close to current price",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate portfolio asset data
 * @param {object} asset - Asset object to validate
 * @returns {object} Validation result with isValid and errors object
 */
export const validatePortfolioAsset = (asset) => {
  const errors = {};

  const coinValidation = validateCoinId(asset.coinId);
  if (!coinValidation.isValid) {
    errors.coinId = coinValidation.error;
  }

  const amountValidation = validateAmount(asset.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error;
  }

  const priceValidation = validatePrice(asset.buyPrice);
  if (!priceValidation.isValid) {
    errors.buyPrice = priceValidation.error;
  }

  if (asset.date) {
    const dateValidation = validateDate(asset.date);
    if (!dateValidation.isValid) {
      errors.date = dateValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate numeric input in real-time (for input fields)
 * @param {string} value - Input value
 * @param {object} options - Validation options
 * @returns {boolean} True if valid
 */
export const validateNumericInput = (value, options = {}) => {
  const {
    allowDecimal = true,
    allowNegative = false,
    maxDecimals = 8,
  } = options;

  // Allow empty string
  if (value === "") return true;

  // Build regex pattern
  let pattern = "^";
  if (allowNegative) pattern += "-?";
  pattern += "\\d*";
  if (allowDecimal) pattern += `(\\.\\d{0,${maxDecimals}})?`;
  pattern += "$";

  const regex = new RegExp(pattern);
  return regex.test(value);
};

/**
 * Sanitize numeric input
 * @param {string} value - Input value to sanitize
 * @param {number} maxDecimals - Maximum decimal places
 * @returns {string} Sanitized value
 */
export const sanitizeNumericInput = (value, maxDecimals = 8) => {
  if (!value) return "";

  // Remove non-numeric characters except . and -
  let sanitized = value.replace(/[^0-9.-]/g, "");

  // Ensure only one decimal point
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = parts[0] + "." + parts.slice(1).join("");
  }

  // Limit decimal places
  if (parts.length === 2 && parts[1].length > maxDecimals) {
    sanitized = parts[0] + "." + parts[1].substring(0, maxDecimals);
  }

  // Ensure only one minus sign at the beginning
  const minusCount = (sanitized.match(/-/g) || []).length;
  if (minusCount > 1) {
    sanitized = "-" + sanitized.replace(/-/g, "");
  } else if (minusCount === 1 && sanitized.indexOf("-") !== 0) {
    sanitized = sanitized.replace("-", "");
  }

  return sanitized;
};
