import { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import coinGeckoAPI from "@services/api/coinGecko";
import { STORAGE_KEYS } from "@utils/constants";
import toast from "@services/notifications/toast";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useLocalStorage(STORAGE_KEYS.WATCHLIST, []);
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateWatchlistData = useCallback(async () => {
    if (watchlist.length === 0) {
      setWatchlistData([]);
      return;
    }

    try {
      setLoading(true);
      const data = await coinGeckoAPI.getCoinsByIds(watchlist, {
        sparkline: true,
        priceChangePercentage: "24h,7d",
      });
      setWatchlistData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
      setLoading(false);
    }
  }, [watchlist]);

  useEffect(() => {
    updateWatchlistData();
    const interval = setInterval(updateWatchlistData, 60000);
    return () => clearInterval(interval);
  }, [updateWatchlistData]);

  const addToWatchlist = useCallback(
    (coinId) => {
      if (watchlist.includes(coinId)) {
        toast.warning("Already in watchlist!");
        return;
      }
      setWatchlist((prev) => [...prev, coinId]);
      toast.success("Added to watchlist!");
    },
    [watchlist, setWatchlist]
  );

  const removeFromWatchlist = useCallback(
    (coinId) => {
      setWatchlist((prev) => prev.filter((id) => id !== coinId));
      toast.success("Removed from watchlist!");
    },
    [setWatchlist]
  );

  const isInWatchlist = useCallback(
    (coinId) => {
      return watchlist.includes(coinId);
    },
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (coinId) => {
      if (isInWatchlist(coinId)) {
        removeFromWatchlist(coinId);
      } else {
        addToWatchlist(coinId);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
    toast.success("Watchlist cleared!");
  }, [setWatchlist]);

  const value = {
    watchlist,
    watchlistData,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    updateWatchlistData,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
