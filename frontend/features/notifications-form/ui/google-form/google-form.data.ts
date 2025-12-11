import { IGoogleForm } from "@/entities/notifications/types/notifications";
import { IInputForm } from "@/shared/types/input-form";

export const googleFormData: IInputForm<IGoogleForm>[] = [
  {
    name: "googleToken",
    field: "Google Token",
    type: "default",
  },
  {
    name: "googleSheetUrl",
    field: "Ссылка на google таблицу",
    type: "default",
  },
];

