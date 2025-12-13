import { AxiosMutation } from "@/shared/api";
import { UpdateSettingsDto } from "../dto/settings-form.dto";
import { AxiosResponse } from "axios";

export const updateSettings = (
  data: UpdateSettingsDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateSettingsDto>({
    path: "leadform-config/settings",
    data,
    method: "patch",
  });
};

