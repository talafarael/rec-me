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
    <div>
      {STEP.MIN < step && <StepButton onClick={backStep} variant="back" />}
      {childrenNextButton}
    </div>
  );
};
