import { buttonData } from "./button.data";
import { useLeadFormStore } from "@/entities/lead-form/store";

export interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "next" | "back" | "submit";
  customTitle?: string;
}

export const StepButton = ({
  variant,
  customTitle,
  ...props
}: StepButtonProps) => {
  const { config } = useLeadFormStore();
  const { title, bgColor, colorText, bgBorder } = buttonData[variant];

  const osnovanieColor = config?.osnovanie?.primaryColor;
  const osnovanieFontColor = config?.osnovanie?.fontColor;
  

  const finalBgColor = (variant === "next" || variant === "submit") && osnovanieColor 
    ? osnovanieColor 
    : bgColor;
  

  const finalColorText = osnovanieFontColor || colorText;
  

  let finalBorderColor = bgBorder;
  if (variant === "back" && osnovanieFontColor) {
    finalBorderColor = osnovanieFontColor;
  } else if ((variant === "next" || variant === "submit") && osnovanieColor) {
    finalBorderColor = osnovanieColor;
  }

  return (
    <button
      {...props}
      className="w-[171px] text-[16px] rounded-[15px] h-[57px] border"
      style={{
        backgroundColor: finalBgColor,
        color: finalColorText,
        borderColor: finalBorderColor,
      }}
    >
      {customTitle ?? title}
    </button>
  );
};
