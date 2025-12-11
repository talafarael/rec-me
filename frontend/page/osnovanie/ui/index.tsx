"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { OsnovanieForm } from "@/features/osnovanie-form/ui/osnovanie-form/idnex";

export const OsnovaniePage = () => {
  const { config } = useLeadFormStore();
  console.log(config);
  if (!config) return "loading";
  return <OsnovanieForm data={config.osnovanie} />;
};
