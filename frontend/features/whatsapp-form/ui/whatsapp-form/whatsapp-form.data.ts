import { ILeadformWhatsapp } from "@/entities/whatsapp/types/whatsapp";
import { IInputFormText } from "@/shared/types/input-form";

export const whatsappFormData: IInputFormText<ILeadformWhatsapp>[] = [
  {
    name: "activateButton",
    field: "Активировать кнопку Whats App",
    type: "checkbox",
  },
  {
    name: "messageTemplate",
    field: "Шаблон сообщения",
    type: "textarea",
  },
  {
    name: "linkTemplate",
    type: "textBlock",
    field: null,
  },
  {
    name: "contactNumbers",
    field: "Номера WhatsApp",
    type: "default",
  },
];
