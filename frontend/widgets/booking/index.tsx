"use client";
import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { FormBooking } from "@/features/booking-form/ui/form";

export const Booking = () => {
  return (
    <div className="flex h-[100%] justify-center">
      <FormBooking />;
    </div>
  );
};
