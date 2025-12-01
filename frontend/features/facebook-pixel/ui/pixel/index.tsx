"use client";
import { useEffect } from "react";
import { sendPixel } from "../../lib/send-pixel";
import { useStep } from "@/shared/ui/step-context";
import { PixelEvent } from "../../enums/events.enum";

export interface PixelTrackerProps {
  pixelId: string;
}

export const PixelTracker = ({ pixelId }: PixelTrackerProps) => {
  const { step } = useStep();

  useEffect(() => {
    let event: PixelEvent;
    switch (step) {
      case 1:
        event = PixelEvent.PageView;
        break;
      case 2:
        event = PixelEvent.ViewContent;
        break;
      case 3:
        event = PixelEvent.InitiateCheckout;
        break;
      default:
        return;
    }

    sendPixel(pixelId, event);
  }, [pixelId, step]);

  return null;
};
