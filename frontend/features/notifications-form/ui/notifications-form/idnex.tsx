import { FormInput } from "@/shared/ui/form-input";
import { notificationsFormData } from "./notifications-form.data";
import { ILeadformNotifications } from "@/entities/token/types/token";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationsFormSchema } from "../../schemas/notifications-form.schema";
import { useUpdateNotifications } from "../../hooks/use-update-notifications";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";

export interface NotificationsFormProps {
  data?: ILeadformNotifications;
}
export const NotificationsForm = ({ data }: NotificationsFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateNotifications, error, loading } = useUpdateNotifications();
  const { control, handleSubmit, reset } = useForm<ILeadformNotifications>({
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
  const handlerCancel = () => {
    reset(data);
  };

  return (
    <form
      className="mt-[50px] ml-[25px] gap-[10px] flex flex-col"
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
      <FormButtons
        loading={loading}
        success={success}
        handlerCancel={handlerCancel}
        error={error}
      />
    </form>
  );
};

