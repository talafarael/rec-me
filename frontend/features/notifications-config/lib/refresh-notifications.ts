import { AxiosError } from "axios";
import { getNotificationsConfig } from "../api";
import { useNotificationsStore } from "@/entities/notifications/store";

export const refreshNotifications = async (): Promise<boolean> => {
  const { loadNotifications, setLoading, setError } = useNotificationsStore.getState();

  setLoading(true);
  setError(undefined);

  try {
    const res = await getNotificationsConfig();
    loadNotifications(res.data);
    return true;
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError(message);
    loadNotifications(null);
    return false;
  } finally {
    setLoading(false);
  }
};

