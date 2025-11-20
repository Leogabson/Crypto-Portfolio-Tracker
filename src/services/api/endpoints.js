export const ENDPOINTS = {
  PING: "/ping",

  COINS_LIST: "/coins/list",
  COINS_MARKETS: "/coins/markets",
  COIN_DETAIL: (id) => `/coins/${id}`,
  COIN_TICKERS: (id) => `/coins/${id}/tickers`,
  COIN_HISTORY: (id) => `/coins/${id}/history`,
  COIN_MARKET_CHART: (id) => `/coins/${id}/market_chart`,
  COIN_MARKET_CHART_RANGE: (id) => `/coins/${id}/market_chart/range`,
  COIN_OHLC: (id) => `/coins/${id}/ohlc`,

  SEARCH: "/search",
  SEARCH_TRENDING: "/search/trending",

  GLOBAL: "/global",
  GLOBAL_DEFI: "/global/decentralized_finance_defi",

  CATEGORIES_LIST: "/coins/categories/list",
  CATEGORIES: "/coins/categories",

  EXCHANGES: "/exchanges",
  EXCHANGE_DETAIL: (id) => `/exchanges/${id}`,

  ASSET_PLATFORMS: "/asset_platforms",

  COMPANIES_HOLDINGS: (coin) => `/companies/public_treasury/${coin}`,
};

/**
 * Build endpoint URL with parameters
 * @param {string} endpoint - Endpoint path
 * @param {object} params - Query parameters
 * @returns {object} Object with url and params
 */
export const buildEndpoint = (endpoint, params = {}) => {
  return {
    url: endpoint,
    params: {
      ...params,

      sparkline: params.sparkline !== undefined ? params.sparkline : false,
      locale: params.locale || "en",
    },
  };
};

export const PARAMS = {
  markets: ({
    vsCurrency = "usd",
    ids = null,
    category = null,
    order = "market_cap_desc",
    perPage = 100,
    page = 1,
    sparkline = false,
    priceChangePercentage = "24h",
  } = {}) => ({
    vs_currency: vsCurrency,
    ...(ids && { ids: Array.isArray(ids) ? ids.join(",") : ids }),
    ...(category && { category }),
    order,
    per_page: perPage,
    page,
    sparkline,
    price_change_percentage: priceChangePercentage,
  }),

  coinDetail: ({
    localization = false,
    tickers = false,
    marketData = true,
    communityData = false,
    developerData = false,
    sparkline = false,
  } = {}) => ({
    localization,
    tickers,
    market_data: marketData,
    community_data: communityData,
    developer_data: developerData,
    sparkline,
  }),

  marketChart: ({ vsCurrency = "usd", days = 7, interval = "daily" } = {}) => ({
    vs_currency: vsCurrency,
    days,
    interval,
  }),

  marketChartRange: ({ vsCurrency = "usd", from, to } = {}) => ({
    vs_currency: vsCurrency,
    from,
    to,
  }),

  ohlc: ({ vsCurrency = "usd", days = 7 } = {}) => ({
    vs_currency: vsCurrency,
    days,
  }),

  search: ({ query } = {}) => ({
    query,
  }),
};

export default ENDPOINTS;
