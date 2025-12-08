import Image from "next/image";
import whatsAppIcon from "@/public/Group 5.svg";
import { useSendPixel } from "@/features/facebook-pixel";
import { PixelEvent } from "@/features/facebook-pixel/enums/events.enum";
export const WhatsAppIcon = () => {
  const { handlerSendPixel } = useSendPixel();
  const handleClick = () => {
    handlerSendPixel(PixelEvent.Lead);

    setTimeout(() => {
      window.location.href = "https://www.whatsapp.com/?lang=en";
    }, 150);
  };
  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      <Image src={whatsAppIcon} alt="WhatsApp" />
    </div>
  );
};
