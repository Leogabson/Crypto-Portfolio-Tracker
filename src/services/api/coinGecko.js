import axiosInstance from "./axios.config";
import { ENDPOINTS, PARAMS } from "./endpoints";

const coinGeckoAPI = {
  /**
   * Ping the API to check if it's alive
   * @returns {Promise} API ping response
   */
  ping: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PING);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get list of all coins with id, name, and symbol
   * @returns {Promise<Array>} List of all coins
   */
  getCoinsList: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.COINS_LIST);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get market data for coins
   * @param {object} options - Market options
   * @returns {Promise<Array>} Market data
   */
  getCoinsMarkets: async (options = {}) => {
    try {
      const params = PARAMS.markets(options);
      const response = await axiosInstance.get(ENDPOINTS.COINS_MARKETS, {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get detailed data for a specific coin
   * @param {string} id - Coin ID
   * @param {object} options - Detail options
   * @returns {Promise<object>} Coin details
   */
  getCoinDetail: async (id, options = {}) => {
    try {
      const params = PARAMS.coinDetail(options);
      const response = await axiosInstance.get(ENDPOINTS.COIN_DETAIL(id), {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get historical market data for a coin
   * @param {string} id - Coin ID
   * @param {object} options - Chart options
   * @returns {Promise<object>} Market chart data
   */
  getCoinMarketChart: async (id, options = {}) => {
    try {
      const params = PARAMS.marketChart(options);
      const response = await axiosInstance.get(
        ENDPOINTS.COIN_MARKET_CHART(id),
        { params }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get historical market data within a date range
   * @param {string} id - Coin ID
   * @param {object} options - Chart range options
   * @returns {Promise<object>} Market chart data
   */
  getCoinMarketChartRange: async (id, options = {}) => {
    try {
      const params = PARAMS.marketChartRange(options);
      const response = await axiosInstance.get(
        ENDPOINTS.COIN_MARKET_CHART_RANGE(id),
        { params }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get OHLC data for a coin
   * @param {string} id - Coin ID
   * @param {object} options - OHLC options
   * @returns {Promise<Array>} OHLC data
   */
  getCoinOHLC: async (id, options = {}) => {
    try {
      const params = PARAMS.ohlc(options);
      const response = await axiosInstance.get(ENDPOINTS.COIN_OHLC(id), {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search for coins, exchanges, and categories
   * @param {string} query - Search query
   * @returns {Promise<object>} Search results
   */
  search: async (query) => {
    try {
      const params = PARAMS.search({ query });
      const response = await axiosInstance.get(ENDPOINTS.SEARCH, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get trending coins
   * @returns {Promise<object>} Trending coins
   */
  getTrending: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.SEARCH_TRENDING);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get global cryptocurrency data
   * @returns {Promise<object>} Global data
   */
  getGlobal: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.GLOBAL);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get global DeFi data
   * @returns {Promise<object>} DeFi data
   */
  getGlobalDeFi: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.GLOBAL_DEFI);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get list of all coin categories
   * @returns {Promise<Array>} Categories list
   */
  getCategoriesList: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.CATEGORIES_LIST);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get coin categories with market data
   * @returns {Promise<Array>} Categories with data
   */
  getCategories: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.CATEGORIES);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get multiple coins by IDs
   * @param {Array<string>} ids - Array of coin IDs
   * @param {object} options - Market options
   * @returns {Promise<Array>} Coins data
   */
  getCoinsByIds: async (ids, options = {}) => {
    try {
      const params = PARAMS.markets({ ...options, ids });
      const response = await axiosInstance.get(ENDPOINTS.COINS_MARKETS, {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get top coins by market cap
   * @param {number} limit - Number of coins to fetch
   * @param {string} vsCurrency - Currency to use
   * @returns {Promise<Array>} Top coins
   */
  getTopCoins: async (limit = 10, vsCurrency = "usd") => {
    try {
      const params = PARAMS.markets({
        vsCurrency,
        order: "market_cap_desc",
        perPage: limit,
        page: 1,
        sparkline: false,
      });
      const response = await axiosInstance.get(ENDPOINTS.COINS_MARKETS, {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get top gainers (24h change)
   * @param {number} limit - Number of coins to fetch
   * @param {string} vsCurrency - Currency to use
   * @returns {Promise<Array>} Top gainers
   */
  getTopGainers: async (limit = 10, vsCurrency = "usd") => {
    try {
      const params = PARAMS.markets({
        vsCurrency,
        order: "market_cap_desc",
        perPage: 250,
        page: 1,
        sparkline: false,
        priceChangePercentage: "24h",
      });
      const response = await axiosInstance.get(ENDPOINTS.COINS_MARKETS, {
        params,
      });

      // Sort by 24h change and return top gainers
      const sorted = response.sort(
        (a, b) =>
          (b.price_change_percentage_24h || 0) -
          (a.price_change_percentage_24h || 0)
      );
      return sorted.slice(0, limit);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get top losers (24h change)
   * @param {number} limit - Number of coins to fetch
   * @param {string} vsCurrency - Currency to use
   * @returns {Promise<Array>} Top losers
   */
  getTopLosers: async (limit = 10, vsCurrency = "usd") => {
    try {
      const params = PARAMS.markets({
        vsCurrency,
        order: "market_cap_desc",
        perPage: 250,
        page: 1,
        sparkline: false,
        priceChangePercentage: "24h",
      });
      const response = await axiosInstance.get(ENDPOINTS.COINS_MARKETS, {
        params,
      });

      const sorted = response.sort(
        (a, b) =>
          (a.price_change_percentage_24h || 0) -
          (b.price_change_percentage_24h || 0)
      );
      return sorted.slice(0, limit);
    } catch (error) {
      throw error;
    }
  },
};

export default coinGeckoAPI;
