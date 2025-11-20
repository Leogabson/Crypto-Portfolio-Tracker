import { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import coinGeckoAPI from "@services/api/coinGecko";
import { STORAGE_KEYS } from "@utils/constants";
import {
  calculateTotalValue,
  calculateTotalInvestment,
  calculateTotalProfitLoss,
  calculateTotalProfitLossPercent,
  calculatePortfolioDistribution,
  calculate24hChange,
} from "@utils/calculations";
import { generateId } from "@utils/helpers";
import toast from "@services/notifications/toast";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useLocalStorage(STORAGE_KEYS.PORTFOLIO, []);
  const [loading, setLoading] = useState(false);

  const updatePrices = useCallback(async () => {
    if (portfolio.length === 0) return;

    try {
      setLoading(true);
      const coinIds = portfolio.map((asset) => asset.coinId);
      const prices = await coinGeckoAPI.getCoinsByIds(coinIds, {
        sparkline: false,
        priceChangePercentage: "24h",
      });

      setPortfolio((prev) =>
        prev.map((asset) => {
          const coinData = prices.find((p) => p.id === asset.coinId);
          if (coinData) {
            return {
              ...asset,
              currentPrice: coinData.current_price,
              priceChangePercent24h: coinData.price_change_percentage_24h,
              image: coinData.image,
              symbol: coinData.symbol,
              name: coinData.name,
            };
          }
          return asset;
        })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error updating prices:", error);
      setLoading(false);
    }
  }, [portfolio, setPortfolio]);

  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const addAsset = useCallback(
    (assetData) => {
      const existingAsset = portfolio.find(
        (a) => a.coinId === assetData.coinId
      );

      if (existingAsset) {
        const totalAmount = existingAsset.amount + assetData.amount;
        const totalCost =
          existingAsset.amount * existingAsset.buyPrice +
          assetData.amount * assetData.buyPrice;
        const avgBuyPrice = totalCost / totalAmount;

        setPortfolio((prev) =>
          prev.map((asset) =>
            asset.coinId === assetData.coinId
              ? { ...asset, amount: totalAmount, buyPrice: avgBuyPrice }
              : asset
          )
        );
        toast.success("Asset updated in portfolio!");
      } else {
        const newAsset = {
          id: generateId(),
          ...assetData,
          addedAt: new Date().toISOString(),
        };
        setPortfolio((prev) => [...prev, newAsset]);
        toast.success("Asset added to portfolio!");
      }

      updatePrices();
    },
    [portfolio, setPortfolio, updatePrices]
  );

  const removeAsset = useCallback(
    (id) => {
      setPortfolio((prev) => prev.filter((asset) => asset.id !== id));
      toast.success("Asset removed from portfolio!");
    },
    [setPortfolio]
  );

  const updateAsset = useCallback(
    (id, updates) => {
      setPortfolio((prev) =>
        prev.map((asset) =>
          asset.id === id ? { ...asset, ...updates } : asset
        )
      );
      toast.success("Asset updated!");
    },
    [setPortfolio]
  );

  const clearPortfolio = useCallback(() => {
    setPortfolio([]);
    toast.success("Portfolio cleared!");
  }, [setPortfolio]);

  const totalValue = calculateTotalValue(portfolio);
  const totalInvestment = calculateTotalInvestment(portfolio);
  const profitLoss = calculateTotalProfitLoss(portfolio);
  const profitLossPercent = calculateTotalProfitLossPercent(portfolio);
  const distribution = calculatePortfolioDistribution(portfolio);
  const change24h = calculate24hChange(portfolio);

  const value = {
    portfolio,
    loading,
    addAsset,
    removeAsset,
    updateAsset,
    clearPortfolio,
    updatePrices,
    totalValue,
    totalInvestment,
    profitLoss,
    profitLossPercent,
    distribution,
    change24h,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
