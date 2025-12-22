"use client";
import { useStep } from "@/shared/ui/step-context";
import { useLeadFormStore } from "@/entities/lead-form/store";

export const StepProgressBar = () => {
  const { step, steps } = useStep();
  const { config } = useLeadFormStore();
  const maxStep = steps.length;
  
  const fontColor = config?.osnovanie?.fontColor || "#FFFFFF";

  return (
    <div className="flex justify-center ">
      <div className="w-[98vw] text-[24px]" style={{ color: fontColor }}>
        Step {step} of {maxStep}
      </div>
    </div>
  );
};
