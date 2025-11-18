/**
 * Sort array by a specific field
 * @param {Array} array - Array to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
export const sortByField = (array, field, direction = "asc") => {
  if (!Array.isArray(array)) return [];

  const sortedArray = [...array].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Compare values
    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Default comparison
    return direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return sortedArray;
};

/**
 * Get nested object value by path
 * @param {object} obj - Object to get value from
 * @param {string} path - Path to value (e.g., 'user.name')
 * @returns {any} Value at path
 */
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

/**
 * Sort coins by market cap
 * @param {Array} coins - Array of coins
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted coins
 */
export const sortByMarketCap = (coins, direction = "desc") => {
  return sortByField(coins, "market_cap", direction);
};

/**
 * Sort coins by price
 * @param {Array} coins - Array of coins
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted coins
 */
export const sortByPrice = (coins, direction = "desc") => {
  return sortByField(coins, "current_price", direction);
};

/**
 * Sort coins by 24h change
 * @param {Array} coins - Array of coins
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted coins
 */
export const sortBy24hChange = (coins, direction = "desc") => {
  return sortByField(coins, "price_change_percentage_24h", direction);
};

/**
 * Sort coins by volume
 * @param {Array} coins - Array of coins
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted coins
 */
export const sortByVolume = (coins, direction = "desc") => {
  return sortByField(coins, "total_volume", direction);
};

/**
 * Sort coins by name alphabetically
 * @param {Array} coins - Array of coins
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted coins
 */
export const sortByName = (coins, direction = "asc") => {
  return sortByField(coins, "name", direction);
};

/**
 * Sort portfolio by value
 * @param {Array} portfolio - Array of portfolio assets
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted portfolio
 */
export const sortPortfolioByValue = (portfolio, direction = "desc") => {
  return [...portfolio].sort((a, b) => {
    const aValue = (a.amount || 0) * (a.currentPrice || 0);
    const bValue = (b.amount || 0) * (b.currentPrice || 0);
    return direction === "asc" ? aValue - bValue : bValue - aValue;
  });
};

/**
 * Sort portfolio by profit/loss
 * @param {Array} portfolio - Array of portfolio assets
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted portfolio
 */
export const sortPortfolioByProfitLoss = (portfolio, direction = "desc") => {
  return [...portfolio].sort((a, b) => {
    const aProfitLoss =
      ((a.currentPrice || 0) - (a.buyPrice || 0)) * (a.amount || 0);
    const bProfitLoss =
      ((b.currentPrice || 0) - (b.buyPrice || 0)) * (b.amount || 0);
    return direction === "asc"
      ? aProfitLoss - bProfitLoss
      : bProfitLoss - aProfitLoss;
  });
};

/**
 * Sort portfolio by profit/loss percentage
 * @param {Array} portfolio - Array of portfolio assets
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted portfolio
 */
export const sortPortfolioByProfitLossPercent = (
  portfolio,
  direction = "desc"
) => {
  return [...portfolio].sort((a, b) => {
    const aPercent = a.buyPrice
      ? (((a.currentPrice || 0) - a.buyPrice) / a.buyPrice) * 100
      : 0;
    const bPercent = b.buyPrice
      ? (((b.currentPrice || 0) - b.buyPrice) / b.buyPrice) * 100
      : 0;
    return direction === "asc" ? aPercent - bPercent : bPercent - aPercent;
  });
};

/**
 * Sort by multiple fields with priority
 * @param {Array} array - Array to sort
 * @param {Array} sortConfig - Array of {field, direction} objects
 * @returns {Array} Sorted array
 */
export const sortByMultipleFields = (array, sortConfig) => {
  if (!Array.isArray(array) || !Array.isArray(sortConfig)) return array;

  return [...array].sort((a, b) => {
    for (const { field, direction } of sortConfig) {
      const aValue = getNestedValue(a, field);
      const bValue = getNestedValue(b, field);

      if (aValue !== bValue) {
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          const result = aValue.localeCompare(bValue);
          return direction === "asc" ? result : -result;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        const result = String(aValue).localeCompare(String(bValue));
        return direction === "asc" ? result : -result;
      }
    }
    return 0;
  });
};

/**
 * Get top N items from array
 * @param {Array} array - Array to get top items from
 * @param {string} field - Field to sort by
 * @param {number} count - Number of items to return
 * @returns {Array} Top N items
 */
export const getTopItems = (array, field, count = 10) => {
  return sortByField(array, field, "desc").slice(0, count);
};

/**
 * Get bottom N items from array
 * @param {Array} array - Array to get bottom items from
 * @param {string} field - Field to sort by
 * @param {number} count - Number of items to return
 * @returns {Array} Bottom N items
 */
export const getBottomItems = (array, field, count = 10) => {
  return sortByField(array, field, "asc").slice(0, count);
};

/**
 * Sort alerts by date
 * @param {Array} alerts - Array of alerts
 * @param {string} direction - Sort direction
 * @returns {Array} Sorted alerts
 */
export const sortAlertsByDate = (alerts, direction = "desc") => {
  return sortByField(alerts, "createdAt", direction);
};

/**
 * Sort alerts by priority (triggered first, then active, then disabled)
 * @param {Array} alerts - Array of alerts
 * @returns {Array} Sorted alerts
 */
export const sortAlertsByPriority = (alerts) => {
  const priorityOrder = { triggered: 0, active: 1, disabled: 2 };

  return [...alerts].sort((a, b) => {
    const aPriority = priorityOrder[a.status] ?? 999;
    const bPriority = priorityOrder[b.status] ?? 999;
    return aPriority - bPriority;
  });
};

/**
 * Toggle sort direction
 * @param {string} currentDirection - Current sort direction
 * @returns {string} New sort direction
 */
export const toggleSortDirection = (currentDirection) => {
  return currentDirection === "asc" ? "desc" : "asc";
};

/**
 * Check if array is sorted
 * @param {Array} array - Array to check
 * @param {string} field - Field to check
 * @param {string} direction - Expected direction
 * @returns {boolean} True if sorted
 */
export const isSorted = (array, field, direction = "asc") => {
  if (!Array.isArray(array) || array.length < 2) return true;

  for (let i = 1; i < array.length; i++) {
    const prevValue = getNestedValue(array[i - 1], field);
    const currValue = getNestedValue(array[i], field);

    if (direction === "asc" && prevValue > currValue) return false;
    if (direction === "desc" && prevValue < currValue) return false;
  }

  return true;
};
