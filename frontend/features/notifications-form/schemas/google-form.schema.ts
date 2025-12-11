import { z } from "zod";

export const googleFormSchema = z.object({
  googleToken: z.string().optional(),
  googleSheetUrl: z.string().optional(),
});

