import { useState, useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS, ALERT_STATUS } from "@utils/constants";
import { generateId } from "@utils/helpers";
import toast from "@services/notifications/toast";

const useAlerts = () => {
  const [alerts, setAlerts] = useLocalStorage(STORAGE_KEYS.ALERTS, []);
  const [activeAlerts, setActiveAlerts] = useState([]);

  useEffect(() => {
    setActiveAlerts(
      alerts.filter((alert) => alert.status === ALERT_STATUS.ACTIVE)
    );
  }, [alerts]);

  const createAlert = useCallback(
    (alertData) => {
      const newAlert = {
        id: generateId(),
        ...alertData,
        status: ALERT_STATUS.ACTIVE,
        createdAt: new Date().toISOString(),
      };

      setAlerts((prev) => [...prev, newAlert]);
      toast.success("Alert created successfully!");
      return newAlert;
    },
    [setAlerts]
  );

  const updateAlert = useCallback(
    (id, updates) => {
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id ? { ...alert, ...updates } : alert
        )
      );
      toast.success("Alert updated!");
    },
    [setAlerts]
  );

  const deleteAlert = useCallback(
    (id) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      toast.success("Alert deleted!");
    },
    [setAlerts]
  );

  const triggerAlert = useCallback(
    (id) => {
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id
            ? {
                ...alert,
                status: ALERT_STATUS.TRIGGERED,
                triggeredAt: new Date().toISOString(),
              }
            : alert
        )
      );
    },
    [setAlerts]
  );

  const checkAlerts = useCallback(
    (coinData) => {
      activeAlerts.forEach((alert) => {
        const coin = coinData.find((c) => c.id === alert.coinId);
        if (!coin) return;

        const currentPrice = coin.current_price;

        if (alert.type === "price_above" && currentPrice >= alert.targetPrice) {
          triggerAlert(alert.id);
          toast.success(`${coin.name} reached $${alert.targetPrice}!`, 5000);
        } else if (
          alert.type === "price_below" &&
          currentPrice <= alert.targetPrice
        ) {
          triggerAlert(alert.id);
          toast.warning(`${coin.name} dropped to $${alert.targetPrice}!`, 5000);
        }
      });
    },
    [activeAlerts, triggerAlert]
  );

  return {
    alerts,
    activeAlerts,
    createAlert,
    updateAlert,
    deleteAlert,
    triggerAlert,
    checkAlerts,
  };
};

export default useAlerts;
