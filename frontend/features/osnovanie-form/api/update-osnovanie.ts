import { AxiosMutation } from "@/shared/api";
import { UpdateOsnovanieDto } from "../dto/osnovanie-form.dto";
import { AxiosResponse } from "axios";

export const updateOsnovanie = (
  data: UpdateOsnovanieDto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateOsnovanieDto>({
    path: "leadform-config/osnovanie",
    data,
    method: "patch",
  });
};
