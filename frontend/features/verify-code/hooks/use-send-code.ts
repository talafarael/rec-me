"use client";
import { useEffect, useState } from "react";
import { sendVerifyCode } from "../api/send-code";
import { AxiosError } from "axios";

export const useSendVerifyCode = (phone: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!phone) return;

    const send = async () => {
      setLoading(true);
      setError(undefined);
      setSuccess(null);

      try {
        await sendVerifyCode(phone);
        setSuccess(true);
        return true;
      } catch (err: unknown) {
        let message = "Unknown error";

        if (err instanceof AxiosError) {
          message = err.response?.data?.message || err.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    send();
  }, [phone]);

  return { loading, error, success };
};
