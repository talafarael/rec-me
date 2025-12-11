import { z } from "zod";

export const step1FormSchema = z.object({
  fieldsCount: z.number().optional(),
  field1Placeholder: z.string().optional(),
  field2Placeholder: z.string().optional(),
  field3Placeholder: z.string().optional(),
});

