import { Link } from "react-router-dom";
import { Moon, Sun, Menu, Bell } from "lucide-react";
import { ThemeContext } from "@context/ThemeContext";
import { useContext } from "react";

const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-dark-400 hover:text-dark-50 transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <span className="text-xl font-bold text-dark-50 hidden sm:block">
                CryptoTracker
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-dark-400 hover:text-dark-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
            </button>

            <button
              onClick={toggleTheme}
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-8 w-px bg-dark-800 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
