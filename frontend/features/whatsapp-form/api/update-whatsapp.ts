import { AxiosMutation } from "@/shared/api";
import { UpdateWhatsappDto } from "../dto/whatsapp-form.dto";
import { AxiosResponse } from "axios";

export const updateWhatsapp = (
  data: UpdateWhatsappDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateWhatsappDto>({
    path: "leadform-config/whatsapp",
    data,
    method: "patch",
  });
};

