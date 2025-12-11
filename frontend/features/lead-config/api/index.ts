import { ILeadformConfig } from "@/entities/lead-form/types/lead-form";
import { AxiosQuery } from "@/shared/api";
import { AxiosResponse } from "axios";

export const getLeadConfig = (): Promise<AxiosResponse<ILeadformConfig>> => {
  return AxiosQuery("leadform-config");
};
