import { useState } from "react";
import { UpdateTelegramDto } from "../dto/telegram-form.dto";
import { updateTelegram } from "../api/update-telegram";
import { AxiosError } from "axios";

export const useUpdateTelegram = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateTelegram = async (data: UpdateTelegramDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateTelegram(data);
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
  return { handlerUpdateTelegram, error, loading };
};

