import { FormInput } from "@/shared/ui/form-input";
import { settingsFormData } from "./settings-form.data";
import { ILeadformSettings } from "@/entities/lead-form/types/lead-form";
import { CustomCheckbox } from "@/shared/ui/custom-checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsFormSchema } from "../../schemas/settings-form.schema";
import { useUpdateSettings } from "../../hooks/use-update-settings";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";

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
  const handlerCancel = () => {
    reset(data);
  };

  return (
    <form
      className="mt-[55px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {settingsFormData.map((elem) => (
        <FormInput<ILeadformSettings>
          key={elem.name}
          data={elem}
          control={control}
        >
          {(field, fieldErrors) => {
            const { value, ...restField } = field;
            return (
              <div className="flex items-center gap-2">
                <CustomCheckbox
                  {...restField}
                  checked={value as boolean}
                  className="w-5 h-5 accent-black"
                />
                <label className="text-[16px] text-black">{elem.field}</label>
              </div>
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

