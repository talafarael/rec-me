import { AxiosMutation } from "@/shared/api";
import { UpdateStep1Dto } from "../dto/step1-form.dto";
import { AxiosResponse } from "axios";

export const updateStep1 = (
  data: UpdateStep1Dto,
): Promise<AxiosResponse> => {
  return AxiosMutation<UpdateStep1Dto>({
    path: "leadform-config/step1",
    data,
    method: "patch",
  });
};

