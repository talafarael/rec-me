import { useState } from "react";
import { UpdateOsnovanieDto } from "../dto/osnovanie-form.dto";
import { updateOsnovanie } from "../api/update-osnovanie";
import { AxiosError } from "axios";

export const useUpdateOsnovanie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateOsnovanie = async (data: UpdateOsnovanieDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateOsnovanie(data);
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
  return { handlerUpdateOsnovanie, error, loading };
};

