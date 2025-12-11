import { AxiosMutation } from "@/shared/api";
import { UpdateGoogleDto } from "../dto/google-form.dto";
import { AxiosResponse } from "axios";

export const updateGoogle = (
  data: UpdateGoogleDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateGoogleDto>({
    path: "leadform-config/notifications/google",
    data,
    method: "patch",
  });
};

