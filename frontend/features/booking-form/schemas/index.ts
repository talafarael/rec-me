import z from "zod";
import { contactSchema } from "./contact.schema";
import {
  verifyCodeOptionalSchema,
  verifyCodeSchema,
} from "./verify-code.schema";
import { createStep1Schema, step1Schema } from "./step1.schema";
import { captchaOptionalSchema, captchaSchema } from "./captcha.schema";
import { ILeadformConfig } from "@/entities/lead-form/types/lead-form";

export const bookingSchema = step1Schema
  .merge(contactSchema)
  .merge(captchaOptionalSchema)
  .merge(verifyCodeOptionalSchema);
export type BookingForm = z.infer<typeof bookingSchema>;

export const createBookingSchema = (config: ILeadformConfig | null) => {
  const settings = config?.settings ?? null;
  const step1Config = config?.step1 ?? null;
  let schema = contactSchema;
  const step1Schema = createStep1Schema(step1Config);
  if (settings?.step1 == true) {
    schema = schema.merge(step1Schema);
  }
  if (settings?.captcha === true) {
    schema = schema.merge(captchaSchema);
  }

  if (settings?.notifications === true) {
    schema = schema.merge(verifyCodeSchema);
  }

  return schema;
};
