"use client";
import { BookingForm } from "@/features/booking-form/schemas";
import { InputsContacts } from "@/features/booking-form/ui/inputs-contacts";
import { InputsVerifyCode } from "@/features/verify-code/ui/inputs-verify-code";
import { useStep } from "@/shared/ui/step-context";
import { Control } from "react-hook-form";

export interface BookingSteperProps {
  control: Control<BookingForm>;
  handlerContactsPage: () => void;
}
export const BookingSteper = ({ control }: BookingSteperProps) => {
  const { step } = useStep();

  switch (step) {
    case 1:
      return <InputsContacts control={control} />;
    case 2:
      return <div>Step 2 content</div>;
    case 3:
      return <InputsVerifyCode />;
    default:
      return <div>Unknown step</div>;
  }
};
