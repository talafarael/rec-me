import { clsx } from "clsx";

export type InputVariant = "default" | "admin";

const inputVariants: Record<InputVariant, string> = {
  default: "w-[352px] pl-[10px] h-[57px] rounded-[15px]",
  admin: " w-[570px] h-[47px] border-[1.5px] pl-[10px] border-black ",
};

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

export const CustomInput = ({
  value,
  onChange,
  variant = "default",
  className,
  ...props
}: CustomInputProps) => {
  return (
    <input
      onChange={onChange}
      value={value ?? ""}
      className={clsx(inputVariants[variant], className)}
      {...props}
    />
  );
};
