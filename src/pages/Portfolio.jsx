import { useState } from "react";
import { Plus, Trash2, Edit, TrendingUp, Briefcase } from "lucide-react";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import usePortfolio from "@hooks/usePortfolio";
import {
  formatCurrency,
  formatPercent,
  formatCryptoAmount,
} from "@utils/formatters";
import { calculateAssetProfitLoss } from "@utils/calculations";

const Portfolio = () => {
  const {
    portfolio,
    totalValue,
    totalInvestment,
    profitLoss,
    profitLossPercent,
    removeAsset,
  } = usePortfolio();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (portfolio.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Portfolio</h1>
            <p className="text-dark-400">
              Track your cryptocurrency investments
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Add Asset
          </Button>
        </div>

        <Card>
          <div className="text-center py-16">
            <Briefcase size={64} className="mx-auto mb-4 text-dark-700" />
            <h3 className="text-xl font-semibold text-dark-50 mb-2">
              Your portfolio is empty
            </h3>
            <p className="text-dark-400 mb-6">
              Start tracking your crypto investments
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus size={18} />}
            >
              Add Your First Asset
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Portfolio</h1>
          <p className="text-dark-400">Track your cryptocurrency investments</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus size={18} />}
        >
          Add Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Total Value</p>
              <h3 className="text-2xl font-bold text-dark-50">
                {formatCurrency(totalValue)}
              </h3>
            </div>
            <div className="p-3 bg-primary-500/10 rounded-lg">
              <TrendingUp className="text-primary-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Total Invested</p>
              <h3 className="text-2xl font-bold text-dark-50">
                {formatCurrency(totalInvestment)}
              </h3>
            </div>
            <div className="p-3 bg-dark-800 rounded-lg">
              <Briefcase className="text-dark-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400 mb-1">Profit/Loss</p>
              <h3
                className={`text-2xl font-bold ${
                  profitLoss >= 0 ? "text-gain" : "text-loss"
                }`}
              >
                {formatCurrency(profitLoss)}
              </h3>
              <p
                className={
                  profitLoss >= 0 ? "text-gain text-sm" : "text-loss text-sm"
                }
              >
                {formatPercent(profitLossPercent)}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                profitLoss >= 0 ? "bg-gain/10" : "bg-loss/10"
              }`}
            >
              <TrendingUp
                className={profitLoss >= 0 ? "text-gain" : "text-loss"}
                size={24}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Your Assets">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">
                  Asset
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Holdings
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Avg Buy Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Current Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Value
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Profit/Loss
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((asset) => {
                const { profit, percentage, isProfit } =
                  calculateAssetProfitLoss(
                    asset.amount,
                    asset.buyPrice,
                    asset.currentPrice
                  );
                const value = asset.amount * asset.currentPrice;

                return (
                  <tr
                    key={asset.id}
                    className="border-b border-dark-800 hover:bg-dark-800 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {asset.image && (
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <p className="text-dark-50 font-medium">
                            {asset.name}
                          </p>
                          <p className="text-sm text-dark-400 uppercase">
                            {asset.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-dark-50">
                      {formatCryptoAmount(asset.amount)}
                    </td>
                    <td className="py-3 px-4 text-right text-dark-400">
                      {formatCurrency(asset.buyPrice)}
                    </td>
                    <td className="py-3 px-4 text-right text-dark-50">
                      {formatCurrency(asset.currentPrice)}
                    </td>
                    <td className="py-3 px-4 text-right text-dark-50 font-medium">
                      {formatCurrency(value)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        isProfit ? "text-gain" : "text-loss"
                      }`}
                    >
                      <div>{formatCurrency(profit)}</div>
                      <div className="text-sm">{formatPercent(percentage)}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-dark-400 hover:text-primary-400 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => removeAsset(asset.id)}
                          className="text-dark-400 hover:text-loss transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Asset to Portfolio"
      >
        <p className="text-dark-400 mb-4">Feature coming soon...</p>
        <Button fullWidth onClick={() => setIsAddModalOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  );
};

export default Portfolio;
