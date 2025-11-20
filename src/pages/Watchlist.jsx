import { Star, Trash2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Skeleton from "@components/common/Skeleton";
import useWatchlist from "@hooks/useWatchlist";
import {
  formatCurrency,
  formatPercent,
  formatMarketCap,
} from "@utils/formatters";

const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlistData, loading, removeFromWatchlist, watchlist } =
    useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Watchlist</h1>
          <p className="text-dark-400">
            Keep track of your favorite cryptocurrencies
          </p>
        </div>

        <Card>
          <div className="text-center py-16">
            <Star size={64} className="mx-auto mb-4 text-dark-700" />
            <h3 className="text-xl font-semibold text-dark-50 mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-dark-400 mb-6">
              Add coins from the Markets page to track them here
            </p>
            <Button onClick={() => navigate("/markets")}>Browse Markets</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Watchlist</h1>
          <p className="text-dark-400">
            Tracking {watchlist.length} cryptocurrencies
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/markets")}>
          Add More
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton height="120px" />
              </Card>
            ))
          : watchlistData.map((coin) => (
              <Card
                key={coin.id}
                hover
                className="cursor-pointer"
                onClick={() => navigate(`/asset/${coin.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-dark-50 font-semibold">
                        {coin.name}
                      </h3>
                      <p className="text-sm text-dark-400 uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(coin.id);
                    }}
                    className="text-dark-400 hover:text-loss transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400 text-sm">Price</span>
                    <span className="text-dark-50 font-semibold">
                      {formatCurrency(coin.current_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400 text-sm">24h Change</span>
                    <span
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "text-gain font-medium"
                          : "text-loss font-medium"
                      }
                    >
                      {formatPercent(coin.price_change_percentage_24h)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400 text-sm">Market Cap</span>
                    <span className="text-dark-400 text-sm">
                      {formatMarketCap(coin.market_cap)}
                    </span>
                  </div>
                </div>

                {coin.sparkline_in_7d?.price && (
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <div className="flex items-center gap-1 text-xs text-dark-400">
                      <TrendingUp size={14} />
                      <span>7 day trend</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Watchlist;
