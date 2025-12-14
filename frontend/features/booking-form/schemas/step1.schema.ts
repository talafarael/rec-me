import { z } from "zod";
import { ILeadformStep1 } from "@/entities/step1/types/step1";

export const step1Schema = z.object({
  field1: z.string().optional(),
  field2: z.string().optional(),
  field3: z.string().optional(),
});

export const createStep1Schema = (step1Config: ILeadformStep1 | null) => {
  const fieldsCount = step1Config?.fieldsCount ?? 0;

  return z.object({
    field1: fieldsCount >= 1 
      ? z.string().min(1, "This field is required")
      : z.string().optional(),
    field2: fieldsCount >= 2 
      ? z.string().min(1, "This field is required")
      : z.string().optional(),
    field3: fieldsCount >= 3 
      ? z.string().min(1, "This field is required")
      : z.string().optional(),
  });
};
