import { IInputForm, IInputFormText } from "@/shared/types/input-form";
import { Control, FieldValues, useWatch } from "react-hook-form";
import { FormInput } from "../form-input";
import { CustomCheckbox } from "../custom-checkbox";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomTextarea } from "../custom-textarea";
import { CustomInput } from "../custom-input";

export interface CustomInputsProps<T extends FieldValues> {
  data: (IInputForm<T> | IInputFormText<T>)[];
  control: Control<T>;
}
export const CustomInputs = <T extends FieldValues>({
  data,
  control,
}: CustomInputsProps<T>) => {
  const formValues = useWatch({ control }) as T;

  return (
    <div className="flex flex-col gap-[10px]">
      {data?.map((elem) => {
        if (elem.type === "textBlock") {
          const fieldContent =
            typeof elem.field === "function"
              ? elem.field(formValues)
              : elem.field;
          return <div key={elem.name}>{fieldContent}</div>;
        }

        if (elem.type === "checkbox") {
          return (
            <FormInput<T> key={elem.name} data={elem} control={control}>
              {(field, fieldErrors) => {
                const { value, ...restField } = field;
                return (
                  <div className="flex items-center  gap-2">
                    <CustomCheckbox
                      {...restField}
                      checked={value as boolean}
                      className="w-5 h-5 accent-black"
                    />
                    <label className="text-[16px] text-black">
                      {elem.field}
                    </label>
                  </div>
                );
              }}
            </FormInput>
          );
        }

        return (
          <FormInput<T> key={elem.name} data={elem} control={control}>
            {(field, fieldErrors) => {
              const { value, ...restField } = field;
              return (
                <BookingFieldInput
                  variant="admin"
                  title={elem.field}
                  fieldErrors={fieldErrors}
                >
                  {elem.type === "textarea" ? (
                    <CustomTextarea
                      variant="admin"
                      {...restField}
                      value={value as string}
                    />
                  ) : (
                    <CustomInput
                      variant="admin"
                      {...restField}
                      value={value as string}
                    />
                  )}
                </BookingFieldInput>
              );
            }}
          </FormInput>
        );
      })}
    </div>
  );
};
