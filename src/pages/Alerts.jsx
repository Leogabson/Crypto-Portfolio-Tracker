import { Bell, Plus } from "lucide-react";
import Card from "@components/common/Card";
import Button from "@components/common/Button";

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Price Alerts</h1>
          <p className="text-dark-400">
            Get notified when prices hit your targets
          </p>
        </div>
        <Button leftIcon={<Plus size={18} />}>Create Alert</Button>
      </div>

      <Card>
        <div className="text-center py-16">
          <Bell size={64} className="mx-auto mb-4 text-dark-700" />
          <h3 className="text-xl font-semibold text-dark-50 mb-2">
            No alerts set
          </h3>
          <p className="text-dark-400 mb-6">
            Create price alerts to stay informed about market changes
          </p>
          <Button leftIcon={<Plus size={18} />}>Create Your First Alert</Button>
        </div>
      </Card>
    </div>
  );
};

export default Alerts;
