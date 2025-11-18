/**
 * Calculate total portfolio value
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {number} Total portfolio value
 */
export const calculateTotalValue = (portfolio) => {
  if (!Array.isArray(portfolio) || portfolio.length === 0) return 0;

  return portfolio.reduce((total, asset) => {
    const value = (asset.amount || 0) * (asset.currentPrice || 0);
    return total + value;
  }, 0);
};

/**
 * Calculate total investment (cost basis)
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {number} Total invested amount
 */
export const calculateTotalInvestment = (portfolio) => {
  if (!Array.isArray(portfolio) || portfolio.length === 0) return 0;

  return portfolio.reduce((total, asset) => {
    const invested = (asset.amount || 0) * (asset.buyPrice || 0);
    return total + invested;
  }, 0);
};

/**
 * Calculate total profit/loss
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {number} Total profit or loss
 */
export const calculateTotalProfitLoss = (portfolio) => {
  const currentValue = calculateTotalValue(portfolio);
  const investment = calculateTotalInvestment(portfolio);
  return currentValue - investment;
};

/**
 * Calculate total profit/loss percentage
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {number} Profit/loss percentage
 */
export const calculateTotalProfitLossPercent = (portfolio) => {
  const investment = calculateTotalInvestment(portfolio);
  if (investment === 0) return 0;

  const profitLoss = calculateTotalProfitLoss(portfolio);
  return (profitLoss / investment) * 100;
};

/**
 * Calculate profit/loss for a single asset
 * @param {number} amount - Amount of crypto owned
 * @param {number} buyPrice - Purchase price
 * @param {number} currentPrice - Current market price
 * @returns {object} Object with profit, loss, and percentage
 */
export const calculateAssetProfitLoss = (amount, buyPrice, currentPrice) => {
  if (!amount || !buyPrice || !currentPrice) {
    return { profit: 0, percentage: 0, isProfit: false };
  }

  const invested = amount * buyPrice;
  const currentValue = amount * currentPrice;
  const profit = currentValue - invested;
  const percentage = (profit / invested) * 100;

  return {
    profit,
    percentage,
    isProfit: profit >= 0,
    invested,
    currentValue,
  };
};

/**
 * Calculate ROI (Return on Investment)
 * @param {number} currentValue - Current value
 * @param {number} initialInvestment - Initial investment
 * @returns {number} ROI percentage
 */
export const calculateROI = (currentValue, initialInvestment) => {
  if (!initialInvestment || initialInvestment === 0) return 0;
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
};

/**
 * Calculate portfolio distribution (percentage per asset)
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {Array} Array of assets with distribution percentage
 */
export const calculatePortfolioDistribution = (portfolio) => {
  if (!Array.isArray(portfolio) || portfolio.length === 0) return [];

  const totalValue = calculateTotalValue(portfolio);

  if (totalValue === 0) {
    return portfolio.map((asset) => ({
      ...asset,
      distribution: 0,
    }));
  }

  return portfolio.map((asset) => {
    const assetValue = (asset.amount || 0) * (asset.currentPrice || 0);
    const distribution = (assetValue / totalValue) * 100;

    return {
      ...asset,
      distribution,
      value: assetValue,
    };
  });
};

/**
 * Calculate average buy price for an asset
 * @param {Array} transactions - Array of buy transactions
 * @returns {number} Average buy price
 */
export const calculateAverageBuyPrice = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return 0;

  let totalAmount = 0;
  let totalCost = 0;

  transactions.forEach((tx) => {
    totalAmount += tx.amount || 0;
    totalCost += (tx.amount || 0) * (tx.price || 0);
  });

  return totalAmount === 0 ? 0 : totalCost / totalAmount;
};

/**
 * Calculate 24h portfolio change
 * @param {Array} portfolio - Array of portfolio assets with price change data
 * @returns {object} Change value and percentage
 */
export const calculate24hChange = (portfolio) => {
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    return { value: 0, percentage: 0 };
  }

  const currentTotal = calculateTotalValue(portfolio);

  const yesterdayTotal = portfolio.reduce((total, asset) => {
    const currentPrice = asset.currentPrice || 0;
    const priceChange24h = asset.priceChangePercent24h || 0;
    const yesterdayPrice = currentPrice / (1 + priceChange24h / 100);
    const yesterdayValue = (asset.amount || 0) * yesterdayPrice;
    return total + yesterdayValue;
  }, 0);

  const changeValue = currentTotal - yesterdayTotal;
  const changePercent =
    yesterdayTotal === 0 ? 0 : (changeValue / yesterdayTotal) * 100;

  return {
    value: changeValue,
    percentage: changePercent,
  };
};

/**
 * Calculate best and worst performing assets
 * @param {Array} portfolio - Array of portfolio assets
 * @returns {object} Best and worst performers
 */
export const calculateBestWorstPerformers = (portfolio) => {
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    return { best: null, worst: null };
  }

  const assetsWithPerformance = portfolio.map((asset) => {
    const { percentage } = calculateAssetProfitLoss(
      asset.amount,
      asset.buyPrice,
      asset.currentPrice
    );
    return { ...asset, performance: percentage };
  });

  const sorted = [...assetsWithPerformance].sort(
    (a, b) => b.performance - a.performance
  );

  return {
    best: sorted[0] || null,
    worst: sorted[sorted.length - 1] || null,
  };
};

/**
 * Calculate price change between two values
 * @param {number} oldPrice - Old price
 * @param {number} newPrice - New price
 * @returns {object} Change value and percentage
 */
export const calculatePriceChange = (oldPrice, newPrice) => {
  if (!oldPrice || oldPrice === 0) {
    return { value: 0, percentage: 0 };
  }

  const changeValue = newPrice - oldPrice;
  const changePercent = (changeValue / oldPrice) * 100;

  return {
    value: changeValue,
    percentage: changePercent,
  };
};

/**
 * Calculate market dominance
 * @param {number} assetMarketCap - Asset's market cap
 * @param {number} totalMarketCap - Total market cap
 * @returns {number} Dominance percentage
 */
export const calculateMarketDominance = (assetMarketCap, totalMarketCap) => {
  if (!totalMarketCap || totalMarketCap === 0) return 0;
  return (assetMarketCap / totalMarketCap) * 100;
};

/**
 * Calculate compound annual growth rate (CAGR)
 * @param {number} initialValue - Initial investment
 * @param {number} finalValue - Final value
 * @param {number} years - Number of years
 * @returns {number} CAGR percentage
 */
export const calculateCAGR = (initialValue, finalValue, years) => {
  if (!initialValue || initialValue === 0 || !years || years === 0) return 0;
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
};

/**
 * Calculate volatility (standard deviation of returns)
 * @param {Array} prices - Array of historical prices
 * @returns {number} Volatility percentage
 */
export const calculateVolatility = (prices) => {
  if (!Array.isArray(prices) || prices.length < 2) return 0;

  // Calculate daily returns
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    const dailyReturn = (prices[i] - prices[i - 1]) / prices[i - 1];
    returns.push(dailyReturn);
  }

  // Calculate mean
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;

  // Calculate variance
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;

  // Standard deviation (volatility)
  const volatility = Math.sqrt(variance) * 100;

  return volatility;
};

/**
 * Calculate break-even price
 * @param {number} totalInvested - Total amount invested
 * @param {number} totalAmount - Total amount of crypto owned
 * @returns {number} Break-even price
 */
export const calculateBreakEvenPrice = (totalInvested, totalAmount) => {
  if (!totalAmount || totalAmount === 0) return 0;
  return totalInvested / totalAmount;
};

/**
 * Calculate position size percentage
 * @param {number} assetValue - Value of the asset
 * @param {number} portfolioValue - Total portfolio value
 * @returns {number} Position size percentage
 */
export const calculatePositionSize = (assetValue, portfolioValue) => {
  if (!portfolioValue || portfolioValue === 0) return 0;
  return (assetValue / portfolioValue) * 100;
};
