import { AxiosMutation } from "@/shared/api";
import { UpdateOsnovanieDto } from "../dto/osnovanie-form.dto";
import { AxiosResponse } from "axios";

export const updateOsnovanie = (
  data: UpdateOsnovanieDto | FormData,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateOsnovanieDto | FormData>({
    path: "leadform-config/osnovanie",
    data,
    method: "patch",
  });
};
