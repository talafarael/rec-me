import { ILeadformNotifications } from "@/entities/token/types/token";
import { IInputForm } from "@/shared/types/input-form";

export const notificationsFormData: IInputForm<ILeadformNotifications>[] = [
  {
    name: "telegramBotToken",
    field: "Token бота telegram",
    type: "default",
  },
  {
    name: "telegramChatId",
    field: "ID чата в telegram",
    type: "default",
  },
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

