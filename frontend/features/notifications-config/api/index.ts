import { ILeadformNotifications } from "@/entities/token/types/token";
import { AxiosQuery } from "@/shared/api";
import { AxiosResponse } from "axios";

export const getNotificationsConfig = (): Promise<
  AxiosResponse<ILeadformNotifications>
> => {
  return AxiosQuery("token");
};
