import { useContext } from "react";
import { WatchlistContext } from "@context/WatchlistContext";

const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }

  return context;
};

export default useWatchlist;
