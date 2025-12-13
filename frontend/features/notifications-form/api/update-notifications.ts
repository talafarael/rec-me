import { AxiosMutation } from "@/shared/api";
import { UpdateNotificationsDto } from "../dto/notifications-form.dto";
import { AxiosResponse } from "axios";

export const updateNotifications = (
  data: UpdateNotificationsDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateNotificationsDto>({
    path: "token",
    data,
    method: "patch",
  });
};
