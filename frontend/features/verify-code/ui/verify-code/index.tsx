import { BookingForm } from "@/features/booking-form/schemas";
import { Control, useWatch } from "react-hook-form";
import { InputsVerifyCode } from "../inputs-verify-code";
import { useSendVerifyCode } from "../../hooks/use-send-code";
import { VerifyCodeError } from "../verify-code-error";

export interface VerifyCodeProps {
  control: Control<BookingForm>;
}

export const VerifyCode = ({ control }: VerifyCodeProps) => {
  const phone = useWatch({ control, name: "phone" });
  const { error } = useSendVerifyCode(phone);
  if (error) {
    return <VerifyCodeError message={error} />;
  }
  // if (loading) {
  //   return <VerifyCodeError message={error} />;
  // }
  return <InputsVerifyCode control={control} />;
};
