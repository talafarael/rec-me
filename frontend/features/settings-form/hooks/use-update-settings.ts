import { useState } from "react";
import { UpdateSettingsDto } from "../dto/settings-form.dto";
import { updateSettings } from "../api/update-settings";
import { AxiosError } from "axios";

export const useUpdateSettings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateSettings = async (data: UpdateSettingsDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateSettings(data);
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
  return { handlerUpdateSettings, error, loading };
};

