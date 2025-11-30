import z from "zod";
import { contactSchema } from "./contact.schema";
import { verifyCodeSchema } from "./verify-code.schema";

export const bookingSchema = contactSchema.merge(verifyCodeSchema);

export type BookingForm = z.infer<typeof bookingSchema>;
