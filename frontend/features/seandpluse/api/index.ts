import { AxiosQuery } from "@/shared/api";
import { AxiosResponse } from "axios";

export const getAdressbooks = (): Promise<AxiosResponse> => {
  return AxiosQuery("sendpluse/addressbooks");
};
