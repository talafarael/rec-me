import { z } from "zod";

export const notificationsFormSchema = z.object({
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  googleToken: z.string().optional(),
  googleSheetUrl: z.string().optional(),
});

