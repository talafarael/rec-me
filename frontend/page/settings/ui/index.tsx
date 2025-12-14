"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { SettingsForm } from "@/features/settings-form/ui/settings-form";

export const SettingsPage = () => {
  const { config } = useLeadFormStore();
  if (!config) return "loading";
  return <SettingsForm data={config?.settings ?? undefined} />;
};
