import { z } from "zod";

export const telegramFormSchema = z.object({
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
});

