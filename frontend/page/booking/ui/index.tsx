"use client";
import { StepProvider } from "@/shared/ui/step-context";
import { Booking } from "@/widgets/booking";
import { PixelTracker } from "@/features/facebook-pixel";
import { useUrlParamStore } from "@/features/url-param/store";
import { BookingLoading } from "./booking-loading";
import { BookingError } from "./booking-error";
import { useGetUrlsParams } from "@/features/url-param/hooks/use-get-urls-params";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { STEPS } from "@/entities/step/constants/step.config";
import { FormStep } from "@/entities/step/enums/step.enum";

export const BookingPage = () => {
  const { params, loading, error } = useUrlParamStore();
  const { config } = useLeadFormStore();
  useGetUrlsParams();

  if (loading) {
    return <BookingLoading />;
  }

  if (error) {
    return <BookingError />;
  }

  const settings = config?.settings;

  if (!config || !settings) return "load";

  const enabledSteps = STEPS.filter(
    (elem) => settings?.[elem.enabledBy] === true,
  );

  if (enabledSteps.length === 0) {
    return "load";
  }

  const initialStep = enabledSteps[0]?.key || FormStep.STEP1;

  return (
    <StepProvider steps={enabledSteps} initialStep={initialStep}>
      <PixelTracker />
      <Booking />
    </StepProvider>
  );
};
