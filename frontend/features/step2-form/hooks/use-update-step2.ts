import { useState } from "react";
import { UpdateStep2Dto } from "../dto/step2-form.dto";
import { updateStep2 } from "../api/update-step2";
import { AxiosError } from "axios";

export const useUpdateStep2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateStep2 = async (data: UpdateStep2Dto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateStep2(data);
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
  return { handlerUpdateStep2, error, loading };
};

