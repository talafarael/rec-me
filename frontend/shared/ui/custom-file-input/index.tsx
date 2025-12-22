import { clsx } from "clsx";
import { InputVariant } from "../custom-input";

const inputVariants: Record<InputVariant, string> = {
  default: "w-[352px] pl-[10px] h-[57px] rounded-[15px]",
  admin: " w-[570px] h-[47px] border-[1.5px] pl-[10px] border-black ",
};

export interface CustomFileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  variant?: InputVariant;
  onChange?: (value: string) => void;
}

export const CustomFileInput = ({
  onChange,
  variant = "default",
  className,
  ...props
}: CustomFileInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className={clsx(inputVariants[variant], className)}
      {...props}
    />
  );
};

