import { AxiosMutation } from "@/shared/api";
import { AxiosResponse } from "axios";

export const sendVerifyCode = (phone: string): Promise<AxiosResponse> => {
  return AxiosMutation<{ phone: string }>({
    path: "twilio",
    data: { phone },
  });
};
