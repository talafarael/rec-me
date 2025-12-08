"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/form-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { loginFormSchema } from "../../schemas/login-form.schema";
import { ILoginForm } from "../../types/login-form";
import { loginFormData } from "./login-form.data";
import { useLogin } from "../../hooks";

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  const { handlerLogin, loading, error } = useLogin();
  const handlerSubmit = (data: ILoginForm) => {
    handlerLogin(data);
  };

  return (
    <form
      className="flex flex-col justify-center items-center h-[100%]"
      onSubmit={handleSubmit(handlerSubmit)}
    >
      <div className="flex flex-col gap-[12px]">
        {loginFormData.map((elem) => (
          <FormInput<ILoginForm> key={elem.name} data={elem} control={control}>
            {(field, fieldErrors) => (
              <BookingFieldInput title={elem.field} fieldErrors={fieldErrors}>
                <CustomInput {...field} />
              </BookingFieldInput>
            )}
          </FormInput>
        ))}
        <button
          type="submit"
          className="w-[352px] h-[57px] rounded-[15px] bg-blue-500 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
