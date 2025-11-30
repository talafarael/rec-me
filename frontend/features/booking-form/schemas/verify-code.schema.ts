import { z } from "zod";

export const verifyCodeSchema = z.object({
  verifyCodePhone: z.string().min(1, "This field is required"),
});
