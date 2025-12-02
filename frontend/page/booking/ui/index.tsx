"use client";
import { StepProvider } from "@/shared/ui/step-context";
import { STEP } from "@/entities/step/constants";
import { Booking } from "@/widgets/booking";
import { useGetUrlsParams } from "@/features/url-param/hook/use-get-urls-params";
import { PixelTracker } from "@/features/facebook-pixel";
import { useUrlParamStore } from "@/features/url-param/store";
import { BookingLoading } from "./booking-loading";
import { BookingError } from "./booking-error";

export const BookingPage = () => {
  const { params, loading, error } = useUrlParamStore();
  useGetUrlsParams();
  if (loading) {
    return <BookingLoading />;
  }
  if (error) {
    return <BookingError />;
  }

  return (
    <StepProvider maxStep={STEP.MAX} initialStep={STEP.DEFAULT}>
      <PixelTracker />
      <Booking />;
    </StepProvider>
  );
};
