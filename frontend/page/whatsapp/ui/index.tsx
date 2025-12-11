"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { WhatsappForm } from "@/features/whatsapp-form/ui/whatsapp-form/idnex";

export const WhatsappPage = () => {
  const { config } = useLeadFormStore();
  if (!config) return "loading";
  return <WhatsappForm data={config.whatsapp} />;
};

