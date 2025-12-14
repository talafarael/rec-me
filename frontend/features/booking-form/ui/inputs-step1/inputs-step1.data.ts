import { IInputForm } from "@/shared/types/input-form";
import { BookingForm } from "../../schemas";
import { ILeadformConfig } from "@/entities/lead-form/types/lead-form";

export const getInputsStep1Data = (
  config: ILeadformConfig | null,
): IInputForm<BookingForm>[] => {
  const fieldsCount = config?.step1?.fieldsCount ?? 3;
  const allFields: IInputForm<BookingForm>[] = [
    {
      name: "field1",
      field: config?.step1?.field1Placeholder ?? "Field 1",
      type: "default",
    },
    {
      name: "field2",
      field: config?.step1?.field2Placeholder ?? "Field 2",
      type: "default",
    },
    {
      name: "field3",
      field: config?.step1?.field3Placeholder ?? "Field 3",
      type: "default",
    },
  ];
  return allFields.slice(0, fieldsCount);
};

