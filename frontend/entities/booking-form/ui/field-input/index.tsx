import { CustomInput } from "@/shared/ui/custom-input";
import { FieldValues } from "react-hook-form";

export interface BookingFieldInputProps {
  field: FieldValues;
  fieldErrors?: React.ReactNode;
  title: string;
}

export const BookingFieldInput = ({
  field,
  fieldErrors,
  title,
}: BookingFieldInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[16px] text-[white]">{title}</h1>
      <CustomInput {...field} />
      <h1 className="text-[14px] text-[white]"> {fieldErrors}</h1>
    </div>
  );
};
