import { AxiosError } from "axios";
import { getLeadConfig } from "../api";
import { useLeadFormStore } from "@/entities/lead-form/store";

export const refreshLeadConfig = async (): Promise<boolean> => {
  const { loadConfig, setLoading, setError } = useLeadFormStore.getState();

  setLoading(true);
  setError(undefined);

  try {
    const res = await getLeadConfig();
    loadConfig(res.data);
    return true;
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError(message);
    loadConfig(null);
    return false;
  } finally {
    setLoading(false);
  }
};

