import { z } from "zod";

export const urlParamsSchema = z.object({
  pixel: z.string(),
  sub1: z.string(),
  sub2: z.string(),
  sub3: z.string(),
  sub4: z.string(),

  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export type IUrlParams = z.infer<typeof urlParamsSchema>;
