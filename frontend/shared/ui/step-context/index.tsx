"use client";
import { FormStepConfig } from "@/entities/step/constants/step.config";
import { FormStep } from "@/entities/step/enums/step.enum";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface StepContext {
  step: number;
  currentStep: FormStep;
  steps: FormStepConfig[];
  nextStep: () => void;
  backStep: () => void;
}

const stepContext = createContext<StepContext | null>(null);

export const useStep = () => {
  const context = useContext(stepContext);
  if (!context) {
    throw new Error("useStep must use within stepProvider");
  }
  return context;
};

export interface StepProviderProps {
  children: ReactNode;
  steps: FormStepConfig[];
  initialStep?: FormStep;
}
export const StepProvider = ({
  children,
  steps,
  initialStep,
}: StepProviderProps) => {
  const getInitialStepIndex = () => {
    if (!initialStep) return 0;
    const index = steps.findIndex((step) => step.key === initialStep);
    return index >= 0 ? index : 0;
  };

  const [stepIndex, setStepIndex] = useState<number>(getInitialStepIndex);
  const maxStep = steps.length - 1;

  const currentStep = steps[stepIndex]?.key || steps[0]?.key || FormStep.STEP1;

  const nextStep = useCallback(
    () => setStepIndex((prev) => Math.min(prev + 1, maxStep)),
    [maxStep],
  );

  const backStep = useCallback(
    () => setStepIndex((prev) => Math.max(prev - 1, 0)),
    [],
  );

  return (
    <stepContext.Provider
      value={{
        step: stepIndex + 1,
        currentStep,
        steps,
        nextStep,
        backStep,
      }}
    >
      {children}
    </stepContext.Provider>
  );
};
