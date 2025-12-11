import { useState } from "react";
import { UpdateWhatsappDto } from "../dto/whatsapp-form.dto";
import { updateWhatsapp } from "../api/update-whatsapp";
import { AxiosError } from "axios";

export const useUpdateWhatsapp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerUpdateWhatsapp = async (data: UpdateWhatsappDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await updateWhatsapp(data);
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
  return { handlerUpdateWhatsapp, error, loading };
};

