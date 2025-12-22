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
      
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "boolean") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, String(value));
          }
        }
      });

      await updateOsnovanie(formData as any);
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

