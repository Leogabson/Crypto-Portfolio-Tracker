import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
      </div>

      <Card>
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-dark-50 mb-2">
            Asset Details
          </h3>
          <p className="text-dark-400">Viewing details for {id}</p>
          <p className="text-sm text-dark-500 mt-4">Feature coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default AssetDetail;
