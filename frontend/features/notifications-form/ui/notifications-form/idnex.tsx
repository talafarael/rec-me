import { FormInput } from "@/shared/ui/form-input";
import { notificationsFormData } from "./notifications-form.data";
import { ILeadformNotifications } from "@/entities/token/types/token";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationsFormSchema } from "../../schemas/notifications-form.schema";
import { useUpdateNotifications } from "../../hooks/use-update-notifications";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";
import { CustomInputs } from "@/shared/ui/custom-inputs";

export interface NotificationsFormProps {
  data?: ILeadformNotifications;
}
export const NotificationsForm = ({ data }: NotificationsFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateNotifications, error, loading } =
    useUpdateNotifications();
  const { control, handleSubmit, reset } = useForm<ILeadformNotifications>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformNotifications, e: any) => {
    const result = await handlerUpdateNotifications(formData);
    if (result) {
      await refreshLeadConfig();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setSuccess(false);
    }
  };
  const handlerCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset(data);
  };

  return (
    <form
      className="mt-[50px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <CustomInputs data={notificationsFormData} control={control} />
      <FormButtons
        loading={loading}
        success={success}
        handlerCancel={handlerCancel}
        error={error}
      />
    </form>
  );
};
