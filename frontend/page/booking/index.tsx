import { StepProvider } from "@/shared/ui/step-context";
import { STEP } from "@/entities/step/constants";
import { Booking } from "@/widgets/booking";

export const BookingPage = () => {
  return (
    <StepProvider maxStep={STEP.MAX} initialStep={STEP.DEFAULT}>
      <Booking />;
    </StepProvider>
  );
};
