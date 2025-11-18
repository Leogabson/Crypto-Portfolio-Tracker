// API Configuration
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_COINGECKO_API_URL ||
    "https://api.coingecko.com/api/v3",
  API_KEY: import.meta.env.VITE_COINGECKO_API_KEY || null,
  CACHE_DURATION: parseInt(import.meta.env.VITE_CACHE_DURATION) || 300000, // 5 minutes
  REFRESH_INTERVAL: parseInt(import.meta.env.VITE_REFRESH_INTERVAL) || 60000, // 1 minute
};

// API Endpoints
export const ENDPOINTS = {
  COINS_MARKETS: "/coins/markets",
  COIN_DETAIL: "/coins",
  COIN_HISTORY: "/coins/{id}/market_chart",
  TRENDING: "/search/trending",
  GLOBAL: "/global",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 50,
  MAX_PER_PAGE: 250,
};

// Currencies
export const CURRENCIES = {
  USD: { symbol: "$", code: "usd", name: "US Dollar" },
  EUR: { symbol: "€", code: "eur", name: "Euro" },
  GBP: { symbol: "£", code: "gbp", name: "British Pound" },
  JPY: { symbol: "¥", code: "jpy", name: "Japanese Yen" },
  BTC: { symbol: "₿", code: "btc", name: "Bitcoin" },
  ETH: { symbol: "Ξ", code: "eth", name: "Ethereum" },
};

export const DEFAULT_CURRENCY = CURRENCIES.USD;

// Time ranges for charts
export const TIME_RANGES = {
  "1D": { label: "1 Day", days: 1, interval: "hourly" },
  "7D": { label: "7 Days", days: 7, interval: "hourly" },
  "30D": { label: "30 Days", days: 30, interval: "daily" },
  "90D": { label: "90 Days", days: 90, interval: "daily" },
  "1Y": { label: "1 Year", days: 365, interval: "daily" },
  ALL: { label: "All Time", days: "max", interval: "daily" },
};

// Sort options for markets table
export const SORT_OPTIONS = {
  MARKET_CAP: { key: "market_cap", label: "Market Cap" },
  PRICE: { key: "current_price", label: "Price" },
  VOLUME: { key: "total_volume", label: "Volume" },
  CHANGE_24H: { key: "price_change_percentage_24h", label: "24h Change" },
  CHANGE_7D: {
    key: "price_change_percentage_7d_in_currency",
    label: "7d Change",
  },
};

// Filter options
export const FILTER_OPTIONS = {
  CATEGORIES: [
    { value: "all", label: "All Coins" },
    { value: "defi", label: "DeFi" },
    { value: "nft", label: "NFT" },
    { value: "metaverse", label: "Metaverse" },
    { value: "gaming", label: "Gaming" },
  ],
  PRICE_RANGES: [
    { value: "all", label: "All Prices", min: 0, max: Infinity },
    { value: "micro", label: "Under $0.01", min: 0, max: 0.01 },
    { value: "low", label: "$0.01 - $1", min: 0.01, max: 1 },
    { value: "mid", label: "$1 - $100", min: 1, max: 100 },
    { value: "high", label: "$100 - $1000", min: 100, max: 1000 },
    { value: "premium", label: "Over $1000", min: 1000, max: Infinity },
  ],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  PORTFOLIO: "crypto_portfolio",
  WATCHLIST: "crypto_watchlist",
  ALERTS: "crypto_alerts",
  THEME: "crypto_theme",
  CURRENCY: "crypto_currency",
  RECENT_SEARCHES: "crypto_recent_searches",
};

// Chart colors
export const CHART_COLORS = {
  PRIMARY: "#3b82f6",
  GAIN: "#10b981",
  LOSS: "#ef4444",
  VOLUME: "#8b5cf6",
  GRID: "#1e293b",
  TOOLTIP_BG: "#0f172a",
};

// Top cryptocurrencies (for quick access/defaults)
export const TOP_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "polkadot", symbol: "DOT", name: "Polkadot" },
  { id: "chainlink", symbol: "LINK", name: "Chainlink" },
];

// Alert types
export const ALERT_TYPES = {
  PRICE_ABOVE: "price_above",
  PRICE_BELOW: "price_below",
  PERCENT_CHANGE: "percent_change",
};

// Alert status
export const ALERT_STATUS = {
  ACTIVE: "active",
  TRIGGERED: "triggered",
  DISABLED: "disabled",
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  API_ERROR: "Failed to fetch data. Please try again.",
  NOT_FOUND: "Coin not found.",
  INVALID_INPUT: "Invalid input. Please check your data.",
  RATE_LIMIT: "Too many requests. Please wait a moment.",
};

// Success messages
export const SUCCESS_MESSAGES = {
  ASSET_ADDED: "Asset added to portfolio successfully!",
  ASSET_REMOVED: "Asset removed from portfolio.",
  ASSET_UPDATED: "Asset updated successfully!",
  WATCHLIST_ADDED: "Added to watchlist!",
  WATCHLIST_REMOVED: "Removed from watchlist.",
  ALERT_CREATED: "Alert created successfully!",
  ALERT_DELETED: "Alert deleted.",
};

// Animation durations (in ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Debounce delays (in ms)
export const DEBOUNCE = {
  SEARCH: 300,
  RESIZE: 150,
  SCROLL: 100,
};

// Table settings
export const TABLE_SETTINGS = {
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
  DEFAULT_ROWS_PER_PAGE: 25,
};
