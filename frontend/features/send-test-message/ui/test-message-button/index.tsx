import { ILeadformNotifications } from "@/entities/token/types/token";
import { ButtonTestMessage } from "@/entities/notifications/ui/button-test-message";
import { useSendTestMessage } from "../../hooks/use-send-messsage";
import { MessageService } from "../../enums/message-service.enum";

export interface TestMessageButtonProps {
  data: ILeadformNotifications;
  service: MessageService;
}

const getRequiredFields = (
  service: MessageService,
  data: ILeadformNotifications,
): boolean => {
  switch (service) {
    case MessageService.Telegram:
      return !!(data.telegramBotToken && data.telegramChatId);
    case MessageService.GoogleSheet:
      return !!(data.googleToken && data.googleSheetUrl);
    case MessageService.SendPulse:
      return !!(
        data.sendpulseSecret &&
        data.sendpulseClientId &&
        data.sendpulseAddressBookId
      );
    default:
      return false;
  }
};

const getServiceLabel = (service: MessageService): string => {
  switch (service) {
    case MessageService.Telegram:
      return "Telegram";
    case MessageService.GoogleSheet:
      return "Google Sheet";
    case MessageService.SendPulse:
      return "SendPulse";
    default:
      return "сервис";
  }
};

export const TestMessageButton = ({
  data,
  service,
}: TestMessageButtonProps) => {
  const { handlerSendTestMessage, loading, error } = useSendTestMessage();

  const handleSend = async (data: ILeadformNotifications) => {
    return await handlerSendTestMessage(data, service);
  };

  const isDisabled = !getRequiredFields(service, data);

  return (
    <ButtonTestMessage
      data={data}
      handler={handleSend}
      loading={loading}
      disabled={isDisabled}
      error={error}
    />
  );
};
