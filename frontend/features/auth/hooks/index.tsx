"use client";
import { useState } from "react";
import { login } from "../api";
import { AxiosError } from "axios";
import { ILoginForm } from "../types/login-form";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();
  const handlerLogin = async (data: ILoginForm) => {
    setLoading(true);
    setError(undefined);
    try {
      const token = await login(data);
      console.log(token.data);
      localStorage.setItem("token", token?.data.accessToken);
      router.push("/admin/settings/osnovanie");
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
  return { handlerLogin, error, loading };
};
