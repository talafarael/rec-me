import { WhatsAppIcon } from "../whats-app-icon";

export const FinallyStep = () => {
  return (
    <div className="flex justify-center items-center  flex-col h-[100vh] gap-[20px]">
      <h1 className="w-[352px] text-[white] text-center text-[16px]">
        Your request has been received by our system. To confirm it, please
        click the button below and send us a message.
      </h1>
      <WhatsAppIcon />
    </div>
  );
};
