import { FormInput } from "@/shared/ui/form-input";
import { inputsContactsData } from "./inputs-contacts.data";
import { CustomInput } from "@/shared/ui/custom-input";
import { Control } from "react-hook-form";
import { BookingForm } from "../../schemas";

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
                  <div>
                    <CustomInput {...field} />
                    {fieldErrors}
                  </div>
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
