import { ILeadformStep2 } from "@/entities/step2/types/step2";
import { IInputForm } from "@/shared/types/input-form";

export const step2FormData: IInputForm<ILeadformStep2>[] = [
  {
    name: "nameSurnamePlaceholder",
    field: "Введите название поля “Name & Surname”",
    type: "default",
  },
  {
    name: "phonePlaceholder",
    field: "Введите название поля “Phone number”",
    type: "default",
  },
  {
    name: "emailPlaceholder",
    field: "Введите название поля “Email”",
    type: "default",
  },
];
