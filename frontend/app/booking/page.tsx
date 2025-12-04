import { Suspense } from "react";
import { BookingPage } from "@/page/booking/ui";
import { BookingLoading } from "@/page/booking/ui/booking-loading";

export default function Home() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingPage />
    </Suspense>
  );
}
