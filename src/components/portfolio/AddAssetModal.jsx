import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import usePortfolio from "@hooks/usePortfolio";
import useDebounce from "@hooks/useDebounce";
import coinGeckoAPI from "@services/api/coinGecko";
import { validateAmount, validatePrice } from "@utils/validators";
import { sanitizeNumericInput } from "@utils/validators";

const AddAssetModal = ({ isOpen, onClose }) => {
  const { addAsset } = usePortfolio();

  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    buyPrice: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      searchCoins(debouncedSearch);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  const searchCoins = async (query) => {
    try {
      setSearchLoading(true);
      const results = await coinGeckoAPI.search(query);
      setSearchResults(results.coins || []);
      setSearchLoading(false);
    } catch (error) {
      console.error("Search error:", error);
      setSearchLoading(false);
      setSearchResults([]);
    }
  };

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setStep(2);
  };

  const handleInputChange = (field, value) => {
    if (field === "amount" || field === "buyPrice") {
      const sanitized = sanitizeNumericInput(value, 8);
      setFormData((prev) => ({ ...prev, [field]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const amountValidation = validateAmount(formData.amount);
    if (!amountValidation.isValid) {
      newErrors.amount = amountValidation.error;
    }

    const priceValidation = validatePrice(formData.buyPrice);
    if (!priceValidation.isValid) {
      newErrors.buyPrice = priceValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const coinDetail = await coinGeckoAPI.getCoinDetail(selectedCoin.id, {
        marketData: true,
      });

      const assetData = {
        coinId: selectedCoin.id,
        name: selectedCoin.name,
        symbol: selectedCoin.symbol,
        image: selectedCoin.large || selectedCoin.thumb,
        amount: parseFloat(formData.amount),
        buyPrice: parseFloat(formData.buyPrice),
        currentPrice: coinDetail.market_data?.current_price?.usd || 0,
        purchaseDate: formData.date,
      };

      addAsset(assetData);
      handleClose();
    } catch (error) {
      console.error("Error adding asset:", error);
      setErrors({ submit: "Failed to add asset. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedCoin(null);
    setFormData({
      amount: "",
      buyPrice: "",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    onClose();
  };

  const handleBack = () => {
    setStep(1);
    setSelectedCoin(null);
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Asset to Portfolio"
      size="md"
    >
      {step === 1 && (
        <div>
          <div className="mb-4">
            <Input
              placeholder="Search for a cryptocurrency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              fullWidth
            />
          </div>

          {searchLoading && (
            <div className="text-center py-8 text-dark-400">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p>Searching...</p>
            </div>
          )}

          {!searchLoading &&
            searchQuery.length >= 2 &&
            searchResults.length === 0 && (
              <div className="text-center py-8 text-dark-400">
                <p>No coins found matching "{searchQuery}"</p>
              </div>
            )}

          {searchResults.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.slice(0, 10).map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => handleCoinSelect(coin)}
                  className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors"
                >
                  <img
                    src={coin.thumb || coin.large}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="text-dark-50 font-medium">{coin.name}</h4>
                    <p className="text-sm text-dark-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                  <div className="text-sm text-dark-400">
                    #{coin.market_cap_rank || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery.length < 2 && (
            <div className="text-center py-8 text-dark-400">
              <Search size={48} className="mx-auto mb-2 opacity-50" />
              <p>Start typing to search for cryptocurrencies</p>
            </div>
          )}
        </div>
      )}

      {step === 2 && selectedCoin && (
        <div>
          <div className="flex items-center gap-3 mb-6 p-4 bg-dark-800 rounded-lg">
            <img
              src={selectedCoin.large || selectedCoin.thumb}
              alt={selectedCoin.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-dark-50 font-semibold text-lg">
                {selectedCoin.name}
              </h3>
              <p className="text-dark-400 uppercase">{selectedCoin.symbol}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Amount"
              type="text"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              error={errors.amount}
              fullWidth
              helperText="How much do you own?"
            />

            <Input
              label="Purchase Price (USD)"
              type="text"
              placeholder="0.00"
              value={formData.buyPrice}
              onChange={(e) => handleInputChange("buyPrice", e.target.value)}
              error={errors.buyPrice}
              fullWidth
              helperText="Price per coin when you bought it"
            />

            <Input
              label="Purchase Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              fullWidth
            />

            {errors.submit && (
              <div className="p-3 bg-loss/10 border border-loss/20 rounded-lg text-loss text-sm">
                {errors.submit}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={handleBack} fullWidth>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
            >
              Add to Portfolio
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddAssetModal;
