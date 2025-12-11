"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { Step1Form } from "@/features/step1-form/ui/step1-form/idnex";

export const Step1Page = () => {
  const { config } = useLeadFormStore();
  if (!config) return "loading";
  return <Step1Form data={config.step1} />;
};

