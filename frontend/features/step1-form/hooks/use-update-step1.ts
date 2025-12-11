import { useState } from "react";
import { UpdateStep1Dto } from "../dto/step1-form.dto";
import { updateStep1 } from "../api/update-step1";
import { AxiosError } from "axios";

export const useUpdateStep1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateStep1 = async (data: UpdateStep1Dto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateStep1(data);
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
  return { handlerUpdateStep1, error, loading };
};

