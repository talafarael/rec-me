"use client";

import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { BookingForm } from "@/features/booking-form/schemas";
import { useStep } from "@/shared/ui/step-context";
import React from "react";
import { Control } from "react-hook-form";

export interface BookingSteperProps {
  control: Control<BookingForm>;
  handlerContactsPage: () => void;
  children?: React.ReactNode;
}
export const BookingSteper = ({ control, children }: BookingSteperProps) => {
  const { currentStep, steps } = useStep();

  const currentStepConfig = steps.find((s) => s.key === currentStep);
  const stepContent = currentStepConfig?.render(control);
  const showButton = currentStepConfig?.showButton ?? true;

  return (
    <div className="h-[100vh]">
      {showButton && <StepProgressBar />}
      <div className="flex flex-col justify-center items-center  h-[90%]">
        {stepContent}
        {showButton && children}
      </div>
    </div>
  );
};
