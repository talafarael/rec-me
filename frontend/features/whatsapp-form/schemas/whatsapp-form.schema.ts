import { z } from "zod";

export const whatsappFormSchema = z.object({
  activateButton: z.boolean().optional().default(false),
  messageTemplate: z.string().optional(),
  linkTemplate: z.string().optional(),
  contactNumbers: z.string().optional(),
});

