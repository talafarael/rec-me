import { IInputForm } from "@/shared/types/input-form";
import { BookingForm } from "../../schemas";
import { ILeadformConfig } from "@/entities/lead-form/types/lead-form";

export const getInputsContactsData = (
  config: ILeadformConfig | null,
): IInputForm<BookingForm>[] => [
    {
      name: "fullName",
      field: config?.step2?.nameSurnamePlaceholder ?? "Name & Surname",
      type: "default",
    },
    {
      name: "phone",
      field: config?.step2?.phonePlaceholder ?? "Phone number",
      type: "phone",
    },
    {
      name: "email",
      field: config?.step2?.emailPlaceholder ?? "Email",
      type: "default",
    },
  ];
