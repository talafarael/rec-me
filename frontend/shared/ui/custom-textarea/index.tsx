import { clsx } from "clsx";

export type TextareaVariant = "default" | "admin";

const textareaVariants: Record<TextareaVariant, string> = {
  default: "w-[352px] pl-[10px] pt-[10px] min-h-[57px] rounded-[15px] resize-y",
  admin:
    "w-[570px] h-[160px] border-[1.5px] pl-[10px] pt-[10px] border-black resize-y",
};

export interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
}

export const CustomTextarea = ({
  value,
  onChange,
  variant = "default",
  className,
  ...props
}: CustomTextareaProps) => {
  return (
    <textarea
      onChange={onChange}
      value={value ?? ""}
      className={clsx(textareaVariants[variant], className)}
      {...props}
    />
  );
};
