import { InputVariant } from "@/shared/ui/custom-input";
import { ReactNode } from "react";
import { clsx } from "clsx";

const inputVariants: Record<
  InputVariant,
  {
    div: string;
    title: string;
    error: string;
  }
> = {
  default: {
    div: "w-[352px] pl-[10px] h-[57px] rounded-[15px]",
    title: "text-[16px]  w-[352px] text-[white]",
    error: "text-[14px]  text-[white]",
  },
  admin: {
    div: "w-[352px] pl-[10px] h-[57px] rounded-[15px]",
    title: "text-[16px]  w-[352px] text-[black]",
    error: "text-[14px]  text-[white]",
  },
};

export interface BookingFieldInputProps {
  // field: FieldValues;
  children: ReactNode;
  fieldErrors?: React.ReactNode;
  title: string;
  variant?: InputVariant;
}

export const BookingFieldInput = ({
  children,
  fieldErrors,
  title,
  variant = "default",
}: BookingFieldInputProps) => {
  const styles = inputVariants[variant];

  return (
    <div className="flex flex-col">
      <h1 className={clsx(styles.title)}>{title}</h1>
      {children}
      <h1 className={clsx(styles.error)}> {fieldErrors}</h1>
    </div>
  );
};
