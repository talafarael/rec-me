import { ILeadformWhatsapp } from "@/entities/whatsapp/types/whatsapp";
import { IInputForm } from "@/shared/types/input-form";

export const whatsappFormData: IInputForm<ILeadformWhatsapp>[] = [
  {
    name: "activateButton",
    field: "Активировать кнопку",
    type: "checkbox",
  },
  {
    name: "messageTemplate",
    field: "Шаблон сообщения",
    type: "default",
  },
  {
    name: "linkTemplate",
    field: "Шаблон ссылки",
    type: "default",
  },
  {
    name: "contactNumbers",
    field: "Номера контактов",
    type: "default",
  },
];

