import { useStep } from "@/shared/ui/step-context";
import { StepButton } from "../button";
import { STEP } from "../../constants";
import { ReactNode } from "react";
export interface StepButtonBarProps {
  childrenNextButton: ReactNode;
}
export const StepButtonBar = ({ childrenNextButton }: StepButtonBarProps) => {
  const { step, backStep } = useStep();
  return (
    <div className="mt-[20px] flex justify-between w-[352px] gap-[20px]">
      {STEP.MIN < step ? (
        <StepButton onClick={backStep} variant="back" type="button" />
      ) : (
        <div></div>
      )}
      {childrenNextButton}
    </div>
  );
};
