"use client";
import { useNotificationsStore } from "@/entities/notifications/store";
import { NotificationsForm } from "@/features/notifications-form/ui/notifications-form/idnex";

export const Notifications = () => {
  const { notifications } = useNotificationsStore();
  if (!notifications) return "loading";

  return <NotificationsForm data={notifications || undefined} />;
};
