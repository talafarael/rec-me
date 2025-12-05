import Image from "next/image";
import Link from "next/link";
import whatsAppIcon from "@/public/Group 5.svg";
import { useSendPixel } from "@/features/facebook-pixel";
import { PixelEvent } from "@/features/facebook-pixel/enums/events.enum";
export const WhatsAppIcon = () => {
  const { handlerSendPixel } = useSendPixel();
  return (
    <Link
      onClick={() => handlerSendPixel(PixelEvent.Lead)}
      href="https://www.whatsapp.com/?lang=en"
    >
      <Image src={whatsAppIcon} alt="" />
    </Link>
  );
};
