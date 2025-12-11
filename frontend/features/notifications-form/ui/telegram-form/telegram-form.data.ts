import { ITelegramForm } from "@/entities/notifications/types/notifications";
import { IInputForm } from "@/shared/types/input-form";

export const telegramFormData: IInputForm<ITelegramForm>[] = [
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
];

