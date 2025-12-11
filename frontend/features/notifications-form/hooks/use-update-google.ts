import { useState } from "react";
import { UpdateGoogleDto } from "../dto/google-form.dto";
import { updateGoogle } from "../api/update-google";
import { AxiosError } from "axios";

export const useUpdateGoogle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateGoogle = async (data: UpdateGoogleDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateGoogle(data);
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
  return { handlerUpdateGoogle, error, loading };
};

