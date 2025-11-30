import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "This field is required"),
  phone: z
    .string()
    .min(1, "This field is required")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
});
