import { useState } from "react";
import { ILeadformNotifications } from "@/entities/token/types/token";
import { sendTestMessage } from "../api";
import { MessageService } from "../enums/message-service.enum";
import { AxiosError } from "axios";

export const useSendTestMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerSendTestMessage = async (
    data: ILeadformNotifications,
    service: MessageService,
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      await sendTestMessage(data, service);
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
  return { handlerSendTestMessage, error, loading };
};
