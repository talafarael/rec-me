"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface StepContext {
  step: number;
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
  initialStep: number;
  maxStep: number;
}
export const StepProvider = ({
  children,
  initialStep = 0,
  maxStep,
}: StepProviderProps) => {
  const [step, setStep] = useState<number>(initialStep);

  const nextStep = useCallback(
    () => setStep((prev) => Math.min(prev + 1, maxStep)),
    [maxStep],
  );

  const backStep = useCallback(
    () => setStep((prev) => Math.max(prev - 1, 0)),
    [],
  );
  return (
    <stepContext.Provider value={{ step, nextStep, backStep }}>
      {children}
    </stepContext.Provider>
  );
};
