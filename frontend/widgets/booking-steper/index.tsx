"use client";

import { STEP } from "@/entities/step/constants";
import { StepProgressBar } from "@/entities/step/ui/step-progress-bar";
import { FinallyStep } from "@/entities/step/whats-app/ui/finally-step";
import { Captch } from "@/features/aws-captch/ui/captcha";
import { BookingForm } from "@/features/booking-form/schemas";
import { InputsContacts } from "@/features/booking-form/ui/inputs-contacts";
import { VerifyCode } from "@/features/verify-code";
import { useStep } from "@/shared/ui/step-context";
import React from "react";
import { Control } from "react-hook-form";

export interface BookingSteperProps {
  control: Control<BookingForm>;
  handlerContactsPage: () => void;
  children?: React.ReactNode;
}
export const BookingSteper = ({ control, children }: BookingSteperProps) => {
  const { step } = useStep();
  const showButton: boolean = !STEP.NOT_SHOW_BUTTON.includes(step);
  const renderStep = () => {
    switch (step) {
      case 1:
        return <InputsContacts control={control} />;
      case 2:
        return <Captch />;
      case 3:
        return <VerifyCode control={control} />;
      case 4:
        return <FinallyStep />;

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="h-[100vh]">
      {showButton && <StepProgressBar />}
      <div className="flex flex-col justify-center items-center top-[3%] h-[100%]">
        {renderStep()}
        {showButton && children}
      </div>
    </div>
  );
};
