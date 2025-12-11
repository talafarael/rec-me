import { FormInput } from "@/shared/ui/form-input";
import { step1FormData } from "./step1-form.data";
import { ILeadformStep1 } from "@/entities/step1/types/step1";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1FormSchema } from "../../schemas/step1-form.schema";
import { useUpdateStep1 } from "../../hooks/use-update-step1";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface Step1FormProps {
  data?: ILeadformStep1;
}
export const Step1Form = ({ data }: Step1FormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateStep1, error, loading } = useUpdateStep1();
  const { control, handleSubmit } = useForm<ILeadformStep1>({
    resolver: zodResolver(step1FormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformStep1) => {
    setSuccess(false);
    const result = await handlerUpdateStep1(formData);
    if (result) {
      await refreshLeadConfig();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      className=" mt-[50px] ml-[25px]"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {step1FormData.map((elem) => (
        <FormInput<ILeadformStep1>
          key={elem.name}
          data={elem}
          control={control}
        >
          {(field, fieldErrors) => {
            const { value, ...restField } = field;
            return (
              <BookingFieldInput
                variant="admin"
                title={elem.field}
                fieldErrors={fieldErrors}
              >
                <CustomInput
                  variant="admin"
                  {...restField}
                  value={value !== undefined ? String(value) : ""}
                />
              </BookingFieldInput>
            );
          }}
        </FormInput>
      ))}
      {error && <CustomErrorText message={error} />}
      <CustomButton
        label="save"
        variant="admin"
        type="submit"
        disabled={loading}
        className={
          success
            ? "w-[120px] mt-[15px]  h-[47px] bg-[#22c55e] text-[white] text-[16px]"
            : "mt-[15px]"
        }
      />
    </form>
  );
};
