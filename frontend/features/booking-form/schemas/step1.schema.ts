import { z } from "zod";

export const step1Schema = z.object({
  field1: z.string().optional(),
  field2: z.string().optional(),
  field3: z.string().optional(),
});

