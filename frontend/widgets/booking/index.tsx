"use client";
import { maxStep } from "@/entities/step/constants";
import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { FormBooking } from "@/features/booking-form/ui/form";
import { StepProvider } from "@/shared/ui/step-context";

export const Booking = () => {
  return (
    <StepProvider maxStep={maxStep} initialStep={1}>
      <StepProgressBar />
      <FormBooking />;
    </StepProvider>
  );
};
