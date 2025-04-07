import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Notification } from "./common";

export interface NotificationAction {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<Notification[] | undefined>(
  undefined,
);
const NotificationActionContext = createContext<NotificationAction | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  console.log("NotificationProvider");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      <NotificationActionContext.Provider
        value={{ addNotification, removeNotification }}
      >
        {children}
      </NotificationActionContext.Provider>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  return context;
};

export const useNotificationActionContext = () => {
  const context = useContext(NotificationActionContext);
  if (!context)
    throw new Error(
      "useNotificationActionContext must be used within NotificationProvider",
    );
  return context;
};
