import { ILeadformNotifications } from "@/entities/token/types/token";
import { IInputFormText } from "@/shared/types/input-form";
import { TestMessageButton } from "@/features/send-test-message/ui";
import { MessageService } from "@/features/send-test-message/enums/message-service.enum";
import React from "react";

export const notificationsFormData: IInputFormText<ILeadformNotifications>[] = [
  {
    name: "telegramBotToken",
    field: "Token бота telegram",
    type: "default",
  },
  {
    name: "telegramChatId",
    field: "ID чата в telegram",
    type: "default",
  },
  {
    name: "telegram-test",
    type: "textBlock",
    field: (
      data: ILeadformNotifications,
      onSave?: () => Promise<void>,
    ) =>
      React.createElement(TestMessageButton, {
        data,
        service: MessageService.Telegram,
      }),
  },
  {
    name: "googleToken",
    field: "Google Token",
    type: "default",
  },
  {
    name: "googleSheetUrl",
    field: "Ссылка на google таблицу",
    type: "default",
  },
  {
    name: "google-test",
    type: "textBlock",
    field: (data: ILeadformNotifications) =>
      React.createElement(TestMessageButton, {
        data,
        service: MessageService.GoogleSheet,
      }),
  },
  {
    name: "sendpulseSecret",
    field: "SendPulse Secret",
    type: "default",
  },
  {
    name: "sendpulseClientId",
    field: "SendPulse Client ID",
    type: "default",
  },
  {
    name: "sendpulseAddressBookId",
    field: "SendPulse Address Book ID",
    type: "default",
  },
  {
    name: "sendpulse-test",
    type: "textBlock",
    field: (data: ILeadformNotifications) =>
      React.createElement(TestMessageButton, {
        data,
        service: MessageService.SendPulse,
      }),
  },
];
