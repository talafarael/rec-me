import { BookingForm } from "@/features/booking-form/schemas";
import { IInputForm } from "@/shared/types/input-form";

export const inputsVerifyCodeData: IInputForm<BookingForm>[] = [
  {
    name: "verifyCodePhone",
    field:
      "An SMS message has been sent to your phone number +380 (098) 999-999-99 To continue, enter the code from this message in the field below;",
    type: "default",
  },
];
