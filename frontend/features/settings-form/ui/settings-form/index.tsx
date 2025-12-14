import { settingsFormData } from "./settings-form.data";
import { ILeadformSettings } from "@/entities/lead-form/types/lead-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsFormSchema } from "../../schemas/settings-form.schema";
import { useUpdateSettings } from "../../hooks/use-update-settings";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";
import { CustomInputs } from "@/shared/ui/custom-inputs";

export interface SettingsFormProps {
  data?: ILeadformSettings;
}
export const SettingsForm = ({ data }: SettingsFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateSettings, error, loading } = useUpdateSettings();
  const { control, handleSubmit, reset } = useForm<ILeadformSettings>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformSettings) => {
    setSuccess(false);
    const result = await handlerUpdateSettings(formData);
    if (result) {
      // Обновляем конфиг из API и сохраняем в store
      await refreshLeadConfig();
      setSuccess(true);
      // Сбрасываем успех через 3 секунды
      setTimeout(() => setSuccess(false), 3000);
    }
  };
  const handlerCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset(data);
  };

  return (
    <form
      className="mt-[55px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <CustomInputs data={settingsFormData} control={control} />
      <FormButtons
        loading={loading}
        success={success}
        handlerCancel={handlerCancel}
        error={error}
      />
    </form>
  );
};

