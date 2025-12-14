import { z } from "zod";

export const captchaSchema = z.object({
  captchaPassed: z.boolean().refine((v) => v === true),
});
export const captchaOptionalSchema = z.object({
  captchaPassed: z.boolean().optional(),
});
