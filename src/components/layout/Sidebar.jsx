import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Star,
  Bell,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { path: "/markets", icon: TrendingUp, label: "Markets" },
    { path: "/watchlist", icon: Star, label: "Watchlist" },
    { path: "/alerts", icon: Bell, label: "Alerts" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-dark-900 border-r border-dark-800 z-50
          transform transition-transform duration-300 lg:translate-x-0 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-800 lg:hidden">
          <span className="text-lg font-semibold text-dark-50">Menu</span>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 mt-4 lg:mt-0">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-dark-400 hover:bg-dark-800 hover:text-dark-50"
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800">
          <div className="bg-dark-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-dark-50 mb-1">
              Need Help?
            </h4>
            <p className="text-xs text-dark-400 mb-3">
              Check our documentation
            </p>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
              View Docs
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
