import { ReactNode } from "react";

export interface BookingFieldInputProps {
  // field: FieldValues;
  children: ReactNode;
  fieldErrors?: React.ReactNode;
  title: string;
}

export const BookingFieldInput = ({
  children,
  fieldErrors,
  title,
}: BookingFieldInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[16px]  w-[352px] text-[white]">{title}</h1>
      {children}
      <h1 className="text-[14px]  text-[white]"> {fieldErrors}</h1>
    </div>
  );
};
