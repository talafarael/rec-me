import { useState } from "react";
import { SendLeadDto } from "../dto/send-lead.dto";
import { sendLead } from "../api/send-lead";
import { AxiosError } from "axios";

export const useSendLead = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const handlerSendLead = async (data: SendLeadDto) => {
    setLoading(true);
    setError(undefined);
    try {
      await sendLead(data);
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
  return { handlerSendLead, error, loading };
};
