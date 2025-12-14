import { ILeadformOsnovanie } from "@/entities/osnovanie/types/osnovanie";
import { IInputForm } from "@/shared/types/input-form";

export const onovanieFormData: IInputForm<ILeadformOsnovanie>[] = [
  {
    name: "forwardButtonText",
    field: "Введите название кнопки вперед",
    type: "default",
  },
  {
    name: "backButtonText",
    field: "Введите название кнопки назад",
    type: "default",
  },
  {
    name: "previewBackText",
    field: "Введите текст на странице приема кода",
    type: "default",
  },
  {
    name: "thankYouText",
    field: "Введите текст на странице спасибо",
    type: "default",
  },
];
