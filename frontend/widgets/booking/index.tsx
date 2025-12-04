"use client";
import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { FormBooking } from "@/features/booking-form/ui/form";

export const Booking = () => {
  return (
    <div className="h-[100vh]">
      <StepProgressBar />
      <FormBooking />;
    </div>
  );
};
