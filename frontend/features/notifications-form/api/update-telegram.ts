import { AxiosMutation } from "@/shared/api";
import { UpdateTelegramDto } from "../dto/telegram-form.dto";
import { AxiosResponse } from "axios";

export const updateTelegram = (
  data: UpdateTelegramDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateTelegramDto>({
    path: "leadform-config/notifications/telegram",
    data,
    method: "patch",
  });
};

