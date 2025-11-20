import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Button from "@components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-dark-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-dark-50 mb-2">
          Page Not Found
        </h2>
        <p className="text-dark-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} leftIcon={<Home size={18} />}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
