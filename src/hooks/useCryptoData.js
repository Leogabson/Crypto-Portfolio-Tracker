import { useState, useEffect, useCallback } from "react";
import coinGeckoAPI from "@services/api/coinGecko";
import { API_CONFIG } from "@utils/constants";

const useCryptoData = (options = {}) => {
  const {
    vsCurrency = "usd",
    perPage = 100,
    page = 1,
    order = "market_cap_desc",
    autoRefresh = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await coinGeckoAPI.getCoinsMarkets({
        vsCurrency,
        perPage,
        page,
        order,
        sparkline: false,
        priceChangePercentage: "24h,7d",
      });

      setData(response);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch crypto data");
      setLoading(false);
    }
  }, [vsCurrency, perPage, page, order]);

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, API_CONFIG.REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [fetchData, autoRefresh]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh,
  };
};

export default useCryptoData;
