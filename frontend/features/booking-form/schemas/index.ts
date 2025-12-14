import z from "zod";
import { contactSchema } from "./contact.schema";
import {
  verifyCodeOptionalSchema,
  verifyCodeSchema,
} from "./verify-code.schema";
import { step1Schema } from "./step1.schema";
import { captchaOptionalSchema, captchaSchema } from "./captcha.schema";
import { ILeadformSettings } from "@/entities/lead-form/types/lead-form";

export const bookingSchema = step1Schema
  .merge(contactSchema)
  .merge(captchaOptionalSchema)
  .merge(verifyCodeOptionalSchema);
export type BookingForm = z.infer<typeof bookingSchema>;

export const createBookingSchema = (settings: ILeadformSettings | null) => {
  let schema = step1Schema.merge(contactSchema);

  if (settings?.captcha === true) {
    schema = schema.merge(captchaSchema);
  }

  if (settings?.notifications === true) {
    schema = schema.merge(verifyCodeSchema);
  }

  return schema;
};
