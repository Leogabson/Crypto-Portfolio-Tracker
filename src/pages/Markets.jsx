import { useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@components/common/Card";
import SearchBar from "@components/common/SearchBar";
import Skeleton from "@components/common/Skeleton";
import useWatchlist from "@hooks/useWatchlist";
import useCryptoData from "@hooks/useCryptoData";
import useDebounce from "@hooks/useDebounce";
import {
  formatCurrency,
  formatPercent,
  formatMarketCap,
  formatVolume,
} from "@utils/formatters";
import { filterBySearch } from "@utils/helpers";

const Markets = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: coins, loading, refresh } = useCryptoData({ perPage: 100 });
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const filteredCoins = filterBySearch(coins, debouncedSearch, [
    "name",
    "symbol",
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50 mb-2">Markets</h1>
        <p className="text-dark-400">Explore cryptocurrency market prices</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coins..."
          fullWidth
        />
      </div>

      <Card>
        {loading ? (
          <Skeleton count={10} height="60px" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-400 w-12"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">
                    Coin
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                    24h
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                    7d
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                    Market Cap
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                    Volume (24h)
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="border-b border-dark-800 hover:bg-dark-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/asset/${coin.id}`)}
                  >
                    <td
                      className="py-3 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => toggleWatchlist(coin.id)}
                        className={`transition-colors ${
                          isInWatchlist(coin.id)
                            ? "text-yellow-400"
                            : "text-dark-600 hover:text-dark-400"
                        }`}
                      >
                        <Star
                          size={18}
                          fill={
                            isInWatchlist(coin.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-dark-400">
                      {coin.market_cap_rank}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-dark-50 font-medium">
                            {coin.name}
                          </p>
                          <p className="text-sm text-dark-400 uppercase">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-dark-50 font-medium">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-gain"
                          : "text-loss"
                      }`}
                    >
                      {formatPercent(coin.price_change_percentage_24h)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        coin.price_change_percentage_7d_in_currency >= 0
                          ? "text-gain"
                          : "text-loss"
                      }`}
                    >
                      {formatPercent(
                        coin.price_change_percentage_7d_in_currency
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-dark-400">
                      {formatMarketCap(coin.market_cap)}
                    </td>
                    <td className="py-3 px-4 text-right text-dark-400">
                      {formatVolume(coin.total_volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredCoins.length === 0 && (
          <div className="text-center py-12 text-dark-400">
            <p>No coins found matching "{searchQuery}"</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Markets;
