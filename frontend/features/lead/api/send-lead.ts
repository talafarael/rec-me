import { AxiosMutation } from "@/shared/api";
import { SendLeadDto } from "../dto/send-lead.dto";
import { AxiosResponse } from "axios";

export const sendLead = (data: SendLeadDto): Promise<AxiosResponse> => {
  return AxiosMutation<SendLeadDto>({
    path: "lead",
    data,
  });
};
