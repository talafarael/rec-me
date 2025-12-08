import { z } from "zod";

export const loginFormSchema = z.object({
  password: z.string().min(1, "This field is required"),
});

