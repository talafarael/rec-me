import { AxiosMutation } from "@/shared/api";
import { UpdateStep2Dto } from "../dto/step2-form.dto";
import { AxiosResponse } from "axios";

export const updateStep2 = (
  data: UpdateStep2Dto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateStep2Dto>({
    path: "leadform-config/step2",
    data,
    method: "patch",
  });
};

