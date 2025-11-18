import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import Dashboard from "@pages/Dashboard";
import Portfolio from "@pages/Portfolio";
import Markets from "@pages/Markets";
import Watchlist from "@pages/Watchlist";
import Alerts from "@pages/Alerts";
import AssetDetail from "@pages/AssetDetail";
import NotFound from "@pages/NotFound";
import { PortfolioProvider } from "@context/PortfolioContext";
import { WatchlistProvider } from "@context/WatchlistContext";
import { ThemeProvider } from "@context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <WatchlistProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/asset/:id" element={<AssetDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </WatchlistProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
