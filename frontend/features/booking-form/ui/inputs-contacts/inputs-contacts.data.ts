import { IInputForm } from "@/shared/types/input-form";
import { BookingForm } from "../../schemas";

export const inputsContactsData: IInputForm<BookingForm>[] = [
  {
    name: "fullName",
    field: "Name & Surname",
    type: "default",
  },
  {
    name: "phone",
    field: "Phone number",
    type: "phone",
  },
  {
    name: "email",
    field: "Email",
    type: "default",
  },
];
