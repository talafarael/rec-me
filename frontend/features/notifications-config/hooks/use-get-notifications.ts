"use client";
import { useEffect } from "react";
import { useNotificationsStore } from "@/entities/notifications/store";
import { refreshNotifications } from "../lib/refresh-notifications";

export const useGetNotifications = () => {
  const { notifications, loading, error } = useNotificationsStore();

  useEffect(() => {
    refreshNotifications();
  }, []);

  return { notifications, error, loading, refresh: refreshNotifications };
};

