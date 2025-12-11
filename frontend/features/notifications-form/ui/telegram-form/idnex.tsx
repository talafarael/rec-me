import { FormInput } from "@/shared/ui/form-input";
import { telegramFormData } from "./telegram-form.data";
import { ITelegramForm } from "@/entities/notifications/types/notifications";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { telegramFormSchema } from "../../schemas/telegram-form.schema";
import { useUpdateTelegram } from "../../hooks/use-update-telegram";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface TelegramFormProps {
  data?: ITelegramForm;
}
export const TelegramForm = ({ data }: TelegramFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateTelegram, error, loading } = useUpdateTelegram();
  const { control, handleSubmit } = useForm<ITelegramForm>({
    resolver: zodResolver(telegramFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ITelegramForm) => {
    setSuccess(false);
    const result = await handlerUpdateTelegram(formData);
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
      {telegramFormData.map((elem) => (
        <FormInput<ITelegramForm>
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

