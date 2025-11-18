import { useContext } from "react";
import { PortfolioContext } from "@context/PortfolioContext";

const usePortfolio = () => {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }

  return context;
};

export default usePortfolio;
