import { ILeadformStep1 } from "@/entities/step1/types/step1";
import { IInputForm } from "@/shared/types/input-form";

export const step1FormData: IInputForm<ILeadformStep1>[] = [
  {
    name: "fieldsCount",
    field: "Количество полей",
    type: "default",
  },
  {
    name: "field1Placeholder",
    field: "Плейсхолдер поля 1",
    type: "default",
  },
  {
    name: "field2Placeholder",
    field: "Плейсхолдер поля 2",
    type: "default",
  },
  {
    name: "field3Placeholder",
    field: "Плейсхолдер поля 3",
    type: "default",
  },
];
