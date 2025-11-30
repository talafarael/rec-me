"use client";
import { useStep } from "@/shared/ui/step-context";
import { maxStep } from "../../constants";

export const StepProgressBar = () => {
  const { step } = useStep();
  return (
    <div className="flex justify-center ">
      <div className="text-[white] w-[98vw] text-[24px]">
        Step {step} of {maxStep}
      </div>
    </div>
  );
};
