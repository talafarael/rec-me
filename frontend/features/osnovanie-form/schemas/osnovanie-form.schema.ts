import { z } from "zod";

export const osnovanieFormSchema = z.object({
  forwardButtonText: z.string().optional(),
  backButtonText: z.string().optional(),
  previewBackText: z.string().optional(),
  thankYouText: z.string().optional(),
  useCaptcha: z.boolean().optional().default(false),
  usePhoneVerification: z.boolean().optional().default(false),
});



