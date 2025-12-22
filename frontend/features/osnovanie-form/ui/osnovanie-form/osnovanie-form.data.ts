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
  {
    name: "backgroundColor",
    field: "Цвет фона",
    type: "color",
  },
  {
    name: "primaryColor",
    field: "Основной цвет",
    type: "color",
  },
  {
    name: "fontColor",
    field: "Цвет шрифта",
    type: "color",
  },
  {
    name: "useBackgroundImage",
    field: "Использовать фоновое изображение",
    type: "checkbox",
  },
  {
    name: "backgroundImage",
    field: "Фоновое изображение",
    type: "file",
  },
];
