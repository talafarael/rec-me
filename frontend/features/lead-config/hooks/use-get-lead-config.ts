"use client";
import { useEffect } from "react";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { refreshLeadConfig } from "../lib/refresh-lead-config";

export const useGetLeadConfig = () => {
  const { config, loading, error } = useLeadFormStore();

  useEffect(() => {
    refreshLeadConfig();
  }, []);

  return { config, error, loading, refresh: refreshLeadConfig };
};
