import { StepProvider } from "@/shared/ui/step-context";
import { Booking } from "@/widgets/booking";

export const BookingPage = () => {
  return (
    <StepProvider initialStep={1}>
      <Booking />
    </StepProvider>
  );
};
