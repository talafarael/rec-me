import { z } from "zod";

export const settingsFormSchema = z.object({
  osnovanie: z.boolean().optional().default(false),
  step1: z.boolean().optional().default(false),
  step2: z.boolean().optional().default(false),
  captcha: z.boolean().optional().default(false),

  notifications: z.boolean().optional().default(false),
  whatsapp: z.boolean().optional().default(false),
  api: z.boolean().optional().default(false),
});
