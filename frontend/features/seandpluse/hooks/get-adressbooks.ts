"use client";
import { useEffect, useState } from "react";
import { getAdressbooks } from "../api";
import { AxiosError } from "axios";
import { IAddressbook } from "../types/adressbook";

export const useGetAddressbooks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [addressbooks, setAddressbooks] = useState<IAddressbook[]>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await getAdressbooks();
        setAddressbooks(res.data);
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
    })();
  }, []);
  return { addressbooks, error, loading };
};
