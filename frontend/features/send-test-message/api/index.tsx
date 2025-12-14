import { ILeadformNotifications } from "@/entities/token/types/token";
import { MessageService } from "../enums/message-service.enum";
import { AxiosMutation } from "@/shared/api";
import { AxiosResponse } from "axios";

export const sendTestMessage = (
  data: ILeadformNotifications,
  service: MessageService,
): Promise<AxiosResponse> => {
  const path = `${service}/test-message`;
  return AxiosMutation<ILeadformNotifications>({
    path: path,
    data,
  });
};
