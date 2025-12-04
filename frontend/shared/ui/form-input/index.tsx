import {
  Controller,
  FieldValues,
  Control,
  ControllerRenderProps,
} from "react-hook-form";
import { IInputForm } from "@/shared/types/input-form";

export interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  data: IInputForm<T>;
  children: (
    field: ControllerRenderProps<T>,
    error?: string,
  ) => React.ReactElement;
}

export const FormInput = <T extends FieldValues>({
  control,
  data,
  children,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={data.name}
      control={control}
      render={({ field, fieldState }) =>
        children(field, fieldState.error?.message)
      }
    />
  );
};
