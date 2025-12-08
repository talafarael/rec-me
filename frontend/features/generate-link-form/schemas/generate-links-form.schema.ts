import { z } from "zod";

export const generateLinksFormSchema = z.object({
  baseUrl: z.string().min(1, "This field is required"),
  pixel: z.string().min(1, "This field is required"),
  sub1: z.string().min(1, "This field is required"),
  sub2: z.string().min(1, "This field is required"),
  sub3: z.string().min(1, "This field is required"),
  sub4: z.string().min(1, "This field is required"),
  // utm_source: z.string().optional(),
  // utm_medium: z.string().optional(),
  // utm_campaign: z.string().optional(),
  // utm_content: z.string().optional(),
  // utm_term: z.string().optional(),
});
