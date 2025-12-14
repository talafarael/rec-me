import { FormInput } from "@/shared/ui/form-input";
import { getInputsVerifyCodeData } from "./inputs-verify-code.data";
import { BookingForm } from "@/features/booking-form/schemas";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { Control } from "react-hook-form";
import { CustomInput } from "@/shared/ui/custom-input";
import { useLeadFormStore } from "@/entities/lead-form/store";

export interface InputsVerifyCodeProps {
  control: Control<BookingForm>;
}

export const InputsVerifyCode = ({ control }: InputsVerifyCodeProps) => {
  const { config } = useLeadFormStore();
  const inputsVerifyCodeData = getInputsVerifyCodeData(config);
  return (
    <div className="flex flex-col gap-[12px]">
      {inputsVerifyCodeData.map((elem) => {
        switch (elem.type) {
          case "default":
            return (
              <FormInput<BookingForm>
                key={elem.name}
                data={elem}
                control={control}
              >
                {(field, fieldErrors) => (
                  <BookingFieldInput
                    title={elem.field}
                    fieldErrors={fieldErrors}
                  >
                    <CustomInput {...field} />
                  </BookingFieldInput>
                )}
              </FormInput>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
