import { IInputForm } from "@/shared/types/input-form";
import { ILoginForm } from "../../types/login-form";

export const loginFormData: IInputForm<ILoginForm>[] = [
  {
    name: "password",
    field: "Password",
    type: "default",
  },
];
