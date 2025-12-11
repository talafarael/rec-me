import { FormInput } from "@/shared/ui/form-input";
import { notificationsFormData } from "./notifications-form.data";
import { ILeadformNotifications } from "@/entities/token/types/token";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationsFormSchema } from "../../schemas/notifications-form.schema";
import { useUpdateNotifications } from "../../hooks/use-update-notifications";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface NotificationsFormProps {
  data?: ILeadformNotifications;
}
export const NotificationsForm = ({ data }: NotificationsFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateNotifications, error, loading } = useUpdateNotifications();
  const { control, handleSubmit } = useForm<ILeadformNotifications>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformNotifications) => {
    setSuccess(false);
    const result = await handlerUpdateNotifications(formData);
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
      {notificationsFormData.map((elem) => (
        <FormInput<ILeadformNotifications>
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

