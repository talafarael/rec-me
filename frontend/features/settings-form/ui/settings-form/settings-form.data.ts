import { ILeadformSettings } from "@/entities/lead-form/types/lead-form";
import { IInputForm } from "@/shared/types/input-form";

export const settingsFormData: IInputForm<ILeadformSettings>[] = [
  {
    name: "step1",
    field: "Шаг 1",
    type: "checkbox",
  },
  {
    name: "step2",
    field: "Шаг 2",
    type: "checkbox",
  },

  { name: "captcha", field: "Каптча", type: "checkbox" },
  {
    name: "notifications",
    field: "Уведомления",
    type: "checkbox",
  },
  {
    name: "whatsapp",
    field: "WhatsApp",
    type: "checkbox",
  },
  {
    name: "api",
    field: "API",
    type: "checkbox",
  },
];
