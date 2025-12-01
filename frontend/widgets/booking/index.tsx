"use client";
import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { FormBooking } from "@/features/booking-form/ui/form";
import { PixelTracker } from "@/features/facebook-pixel";

export const Booking = () => {
  return (
    <div>
      <PixelTracker pixelId="830843419827538" />
      <StepProgressBar />
      <FormBooking />;
    </div>
  );
};
