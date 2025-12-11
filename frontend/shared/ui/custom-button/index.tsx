import { clsx } from "clsx";

import { InputVariant } from "../custom-input";

const inputVariants: Record<InputVariant, string> = {
  default: "",
  admin: "w-[120px] h-[47px] bg-[black] text-[white] text-[16px]",
};
export interface CustomButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  variant?: InputVariant;
  label: string;
}
export const CustomButton = ({
  variant = "default",
  label,
  className,
  type = "button",
  ...props
}: CustomButtonProps) => {
  return (
    <button className={clsx(inputVariants[variant], className)} {...props}>
      {label}
    </button>
  );
};
