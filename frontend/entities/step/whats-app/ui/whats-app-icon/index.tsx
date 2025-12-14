import Image from "next/image";
import whatsAppIcon from "@/public/Group 5.svg";
import { useSendPixel } from "@/features/facebook-pixel";
import { PixelEvent } from "@/features/facebook-pixel/enums/events.enum";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { BookingForm } from "@/features/booking-form/schemas";

interface WhatsAppIconProps {
  formValues: Partial<BookingForm>;
}

export const WhatsAppIcon = ({ formValues }: WhatsAppIconProps) => {
  const { config } = useLeadFormStore();

  const { handlerSendPixel } = useSendPixel();

  const buildWhatsAppUrl = (): string => {
    const phoneNumber = config?.whatsapp?.contactNumbers || "";

    const messageTemplate =
      config?.whatsapp?.messageTemplate ||
      `Hello, my name is [name] [surname]
I would like to contact you to discuss an important topic for me
My email: [email]
My additional phone number: [phone]
Additional information: [1_field_]`;

    const fullName = formValues.fullName || "";
    const nameParts = fullName.trim().split(/\s+/);
    const name = nameParts[0] || "";
    const surname = nameParts.slice(1).join(" ") || "";
    const email = formValues.email || "";
    const phone = formValues.phone || "";
    const field1 = formValues.field1 || "";
    const field2 = formValues.field2 || "";
    const field3 = formValues.field3 || "";

    let message = messageTemplate;
    message = message.replace(/\[name\]/gi, name);
    message = message.replace(/\[surname\]/gi, surname);
    message = message.replace(/\[email\]/gi, email);
    message = message.replace(/\[phone\]/gi, phone);
    message = message.replace(/\[1_field_\]/gi, field1);
    message = message.replace(/\[2_field_\]/gi, field2);
    message = message.replace(/\[3_field_\]/gi, field3);

    const encodedMessage = encodeURIComponent(message);

    return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
  };

  const handleClick = () => {
    handlerSendPixel(PixelEvent.Contact);

    setTimeout(() => {
      const url = buildWhatsAppUrl();
      window.location.href = url;
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
