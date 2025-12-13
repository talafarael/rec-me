"use client";
import { useEffect } from "react";
import { sendPixel } from "../../lib/send-pixel";
import { useStep } from "@/shared/ui/step-context";
import { PixelEvent } from "../../enums/events.enum";
import { useUrlParamStore } from "@/features/url-param/store";

export const PixelTracker = () => {
  const { step } = useStep();
  const { params } = useUrlParamStore();
  const pixelId = params?.pixel;
  useEffect(() => {
    if (!pixelId) return;

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
      case 4:
        event = PixelEvent.Lead;
        break;

      default:
        return;
    }

    sendPixel(pixelId, event);
  }, [pixelId, step]);

  return null;
};
