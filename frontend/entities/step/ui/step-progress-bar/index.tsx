"use client";
import { useStep } from "@/shared/ui/step-context";

export const StepProgressBar = () => {
  const { step, steps } = useStep();
  const maxStep = steps.length;

  return (
    <div className="flex justify-center ">
      <div className="text-[white] w-[98vw] text-[24px]">
        Step {step} of {maxStep}
      </div>
    </div>
  );
};
