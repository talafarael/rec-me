"use client";

import { useUrlParamStore } from "@/features/url-param/store";
import { PixelEvent } from "../enums/events.enum";
import { sendPixel } from "../lib/send-pixel";

export const useSendPixel = () => {
  const { params } = useUrlParamStore();
  const handlerSendPixel = (event: PixelEvent) => {
    const pixelId = params?.pixel;
    if (!pixelId) return;
    sendPixel(pixelId, event);
  };
  return { handlerSendPixel };
};
