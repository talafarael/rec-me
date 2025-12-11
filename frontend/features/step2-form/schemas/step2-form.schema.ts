import { z } from "zod";

export const step2FormSchema = z.object({
  nameSurnamePlaceholder: z.string().optional(),
  phonePlaceholder: z.string().optional(),
  emailPlaceholder: z.string().optional(),
});

