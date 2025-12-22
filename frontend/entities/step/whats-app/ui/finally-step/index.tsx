import { useLeadFormStore } from "@/entities/lead-form/store";
import { WhatsAppIcon } from "../whats-app-icon";
import { Control, useWatch } from "react-hook-form";
import { BookingForm } from "@/features/booking-form/schemas";

export const FinallyStep = ({ control }: { control: Control<BookingForm> }) => {
  const { config } = useLeadFormStore();
  const formValues = useWatch({ control });
  const fontColor = config?.osnovanie?.fontColor || "#FFFFFF";

  return (
    <div className="flex justify-center items-center  flex-col h-[100vh] gap-[20px]">
      <h1 className="w-[352px] text-center text-[16px]" style={{ color: fontColor }}>
        {config?.osnovanie?.thankYouText ??
          `Your request has been received by our system. To confirm it, please
        click the button below and send us a message.`}
      </h1>
      {config?.settings?.whatsapp && <WhatsAppIcon formValues={formValues} />}
    </div>
  );
};
