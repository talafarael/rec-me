import { AxiosMutation } from "@/shared/api";
import { ILoginForm } from "../types/login-form";
import { AxiosResponse } from "axios";
import { ILoginResponse } from "../types/token";

export const login = (
  data: ILoginForm,
): Promise<AxiosResponse<ILoginResponse>> => {
  return AxiosMutation<ILoginForm>({
    path: "auth/login",
    data,
  });
};
