import { InputVariant } from "@/shared/ui/custom-input";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { useLeadFormStore } from "@/entities/lead-form/store";

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
    title: "text-[16px]  w-[352px]",
    error: "text-[14px]",
  },
  admin: {
    div: "w-[352px] pl-[10px] h-[57px] rounded-[15px]",
    title: "text-[16px]  w-[352px]",
    error: "text-[14px]",
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
  const { config } = useLeadFormStore();
  const styles = inputVariants[variant];
  const fontColor = variant === "admin" 
    ? "#000000" 
    : (config?.osnovanie?.fontColor || "#FFFFFF");

  return (
    <div className="flex flex-col">
      <h1 className={clsx(styles.title)} style={{ color: fontColor }}>{title}</h1>
      {children}
      <h1 className={clsx(styles.error)} style={{ color: fontColor }}> {fieldErrors}</h1>
    </div>
  );
};
