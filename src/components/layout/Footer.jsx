import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-dark-400">
            © {currentYear} CryptoTracker. Built with React & CoinGecko API.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href="#"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              Privacy
            </a>
            <span className="text-dark-700">•</span>
            <a
              href="#"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              Terms
            </a>
            <span className="text-dark-700">•</span>
            <a
              href="#"
              className="text-dark-400 hover:text-dark-50 transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
