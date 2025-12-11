"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { Step2Form } from "@/features/step2-form/ui/step2-form/idnex";

export const Step2Page = () => {
  const { config } = useLeadFormStore();
  if (!config) return "loading";
  return <Step2Form data={config.step2} />;
};

