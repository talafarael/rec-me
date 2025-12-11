import { FormInput } from "@/shared/ui/form-input";
import { googleFormData } from "./google-form.data";
import { IGoogleForm } from "@/entities/notifications/types/notifications";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleFormSchema } from "../../schemas/google-form.schema";
import { useUpdateGoogle } from "../../hooks/use-update-google";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface GoogleFormProps {
  data?: IGoogleForm;
}
export const GoogleForm = ({ data }: GoogleFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateGoogle, error, loading } = useUpdateGoogle();
  const { control, handleSubmit } = useForm<IGoogleForm>({
    resolver: zodResolver(googleFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: IGoogleForm) => {
    setSuccess(false);
    const result = await handlerUpdateGoogle(formData);
    if (result) {
      await refreshLeadConfig();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      className="mt-[50px] ml-[25px]"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {googleFormData.map((elem) => (
        <FormInput<IGoogleForm>
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
                  value={value as string}
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
            ? "w-[120px] mt-[15px] h-[47px] bg-[#22c55e] text-[white] text-[16px]"
            : "mt-[15px]"
        }
      />
    </form>
  );
};

