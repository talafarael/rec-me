import { FormInput } from "@/shared/ui/form-input";
import { inputsContactsData } from "./inputs-contacts.data";
import { Control } from "react-hook-form";
import { BookingForm } from "../../schemas";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";

export interface InputsContactsProps {
  control: Control<BookingForm>;
}
export const InputsContacts = ({ control }: InputsContactsProps) => {
  return (
    <div>
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
                    field={field}
                    fieldErrors={fieldErrors}
                  />
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
