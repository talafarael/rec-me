import { useState } from "react";
import { UpdateNotificationsDto } from "../dto/notifications-form.dto";
import { updateNotifications } from "../api/update-notifications";
import { AxiosError } from "axios";

export const useUpdateNotifications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateNotifications = async (data: UpdateNotificationsDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateNotifications(data);
      return true;
    } catch (err: unknown) {
      let message = "Unknown error";

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { handlerUpdateNotifications, error, loading };
};

