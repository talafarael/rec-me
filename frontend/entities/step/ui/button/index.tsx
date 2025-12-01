import { buttonData } from "./button.data";

export interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "next" | "back";
}

export const StepButton = ({ variant, ...props }: StepButtonProps) => {
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
      {title}
    </button>
  );
};
