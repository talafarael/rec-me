import { FormInput } from "@/shared/ui/form-input";
import { onovanieFormData } from "./osnovanie-form.data";
import { ILeadformOsnovanie } from "@/entities/osnovanie/types/osnovanie";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { CustomCheckbox } from "@/shared/ui/custom-checkbox";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { osnovanieFormSchema } from "../../schemas/osnovanie-form.schema";
import { useUpdateOsnovanie } from "../../hooks/use-update-osnovanie";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface OsnovanieFormProps {
  data?: ILeadformOsnovanie;
}
export const OsnovanieForm = ({ data }: OsnovanieFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateOsnovanie, error, loading } = useUpdateOsnovanie();
  const { control, handleSubmit } = useForm<ILeadformOsnovanie>({
    resolver: zodResolver(osnovanieFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformOsnovanie) => {
    setSuccess(false);
    const result = await handlerUpdateOsnovanie(formData);
    if (result) {
      // Обновляем конфиг из API и сохраняем в store
      await refreshLeadConfig();
      setSuccess(true);
      // Сбрасываем успех через 3 секунды
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      className=" mt-[55px] ml-[25px]"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {onovanieFormData.map((elem) => (
        <FormInput<ILeadformOsnovanie>
          key={elem.name}
          data={elem}
          control={control}
        >
          {(field, fieldErrors) => {
            const { value, ...restField } = field;
            if (elem.type === "checkbox") {
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
            }
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
            ? "w-[120px] mt-[15px]  h-[47px] bg-[#22c55e] text-[white] text-[16px]"
            : "mt-[15px]"
        }
      />
    </form>
  );
};
