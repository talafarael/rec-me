"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { NotificationsForm } from "@/features/notifications-form/ui/notifications-form/idnex";

export const Notifications = () => {
  const { config } = useLeadFormStore();
  if (!config) return "loading";

  return <NotificationsForm data={config.notifications || undefined} />;
};

