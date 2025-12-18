import { BookingForm } from "@/features/booking-form/schemas";
import { IInputForm } from "@/shared/types/input-form";
import { ILeadformConfig } from "@/entities/lead-form/types/lead-form";

export const getInputsVerifyCodeData = (
  config: ILeadformConfig | null,
): IInputForm<BookingForm>[] => [
    {
      name: "verifyCodePhone",
      field:
        config?.osnovanie?.previewBackText ??
        "An SMS message has been sent to your phone number +380 (098) 999-999-99 To continue, enter the code from this message in the field below;",
      type: "default",
    },
  ];
