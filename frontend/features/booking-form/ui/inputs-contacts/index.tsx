import { FormInput } from "@/shared/ui/form-input";
import { inputsContactsData } from "./inputs-contacts.data";
import { Control } from "react-hook-form";
import { BookingForm } from "../../schemas";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { CustomPhoneInput } from "@/shared/ui/custom-phone-input";

export interface InputsContactsProps {
  control: Control<BookingForm>;
}
export const InputsContacts = ({ control }: InputsContactsProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      {inputsContactsData.map((elem) => {
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
          case "phone":
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
                    <CustomPhoneInput {...field} />
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
