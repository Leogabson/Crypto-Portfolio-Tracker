import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import Card from "@components/common/Card";
import usePortfolio from "@hooks/usePortfolio";
import useCryptoData from "@hooks/useCryptoData";
import {
  formatCurrency,
  formatPercent,
  formatMarketCap,
} from "@utils/formatters";
import Skeleton from "@components/common/Skeleton";

const Dashboard = () => {
  const { totalValue, profitLoss, profitLossPercent, change24h } =
    usePortfolio();
  const { data: marketData, loading } = useCryptoData({ perPage: 10 });
  const [globalData, setGlobalData] = useState(null);

  const stats = [
    {
      label: "Portfolio Value",
      value: formatCurrency(totalValue),
      change: formatPercent(profitLossPercent),
      icon: DollarSign,
      isPositive: profitLoss >= 0,
    },
    {
      label: "24h Change",
      value: formatCurrency(change24h.value),
      change: formatPercent(change24h.percentage),
      icon: Activity,
      isPositive: change24h.value >= 0,
    },
    {
      label: "Total Profit/Loss",
      value: formatCurrency(profitLoss),
      change: formatPercent(profitLossPercent),
      icon: profitLoss >= 0 ? TrendingUp : TrendingDown,
      isPositive: profitLoss >= 0,
    },
    {
      label: "Total Coins",
      value:
        marketData.length > 0
          ? formatMarketCap(marketData[0]?.market_cap)
          : "$0",
      change: "+5.2%",
      icon: Activity,
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50 mb-2">Dashboard</h1>
        <p className="text-dark-400">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-dark-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-dark-50 mb-1">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1">
                  <span className={stat.isPositive ? "text-gain" : "text-loss"}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stat.isPositive ? "bg-gain/10" : "bg-loss/10"
                }`}
              >
                <stat.icon
                  className={stat.isPositive ? "text-gain" : "text-loss"}
                  size={24}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Cryptocurrencies" subtitle="By Market Cap">
          {loading ? (
            <Skeleton count={5} height="60px" />
          ) : (
            <div className="space-y-3">
              {marketData.slice(0, 5).map((coin) => (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h4 className="text-dark-50 font-medium">{coin.name}</h4>
                      <p className="text-sm text-dark-400 uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-dark-50 font-medium">
                      {formatCurrency(coin.current_price)}
                    </p>
                    <p
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "text-gain text-sm"
                          : "text-loss text-sm"
                      }
                    >
                      {formatPercent(coin.price_change_percentage_24h)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Recent Activity" subtitle="Your latest transactions">
          <div className="text-center py-12 text-dark-400">
            <Activity size={48} className="mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm mt-2">Your transactions will appear here</p>
          </div>
        </Card>
      </div>

      <Card title="Market Overview">
        {loading ? (
          <Skeleton count={3} height="80px" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
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
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketData.slice(0, 10).map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-b border-dark-800 hover:bg-dark-800 transition-colors"
                  >
                    <td className="py-3 px-4 text-dark-400">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-dark-50 font-medium">
                          {coin.name}
                        </span>
                        <span className="text-dark-400 text-sm uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-dark-50">
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
                    <td className="py-3 px-4 text-right text-dark-400">
                      {formatMarketCap(coin.market_cap)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
