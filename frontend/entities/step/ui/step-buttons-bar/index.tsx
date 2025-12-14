import { useStep } from "@/shared/ui/step-context";
import { StepButton } from "../button";
import { STEP } from "../../constants";
import { useLeadFormStore } from "@/entities/lead-form/store";

export interface StepButtonBarProps {
  children?: React.ReactNode;
  backButtonText?: string;
}
export const StepButtonBar = ({
  children,
  backButtonText,
}: StepButtonBarProps) => {
  const { step, backStep } = useStep();
  const { config } = useLeadFormStore();
  return (
    <div className="mt-[20px] flex justify-between w-[352px] gap-[20px]">
      {STEP.MIN < step ? (
        <StepButton
          customTitle={config?.osnovanie?.backButtonText}
          onClick={backStep}
          variant="back"
          type="button"
          title={backButtonText ?? "Back"}
        />
      ) : (
        <div></div>
      )}
      {children}
    </div>
  );
};
