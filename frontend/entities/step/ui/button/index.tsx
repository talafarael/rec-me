import { buttonData } from "./button.data";

export interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "next" | "back" | "submit";
  customTitle?: string;
}

export const StepButton = ({
  variant,
  customTitle,
  ...props
}: StepButtonProps) => {
  const { title, bgColor, colorText, bgBorder } = buttonData[variant];

  return (
    <button
      {...props}
      className="w-[171px] text-[16px] rounded-[15px] h-[57px] border"
      style={{
        backgroundColor: bgColor,
        color: colorText,
        borderColor: bgBorder,
      }}
    >
      {customTitle ?? title}
    </button>
  );
};
