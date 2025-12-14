import { FormInput } from "@/shared/ui/form-input";
import { onovanieFormData } from "./osnovanie-form.data";
import { ILeadformOsnovanie } from "@/entities/osnovanie/types/osnovanie";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { CustomCheckbox } from "@/shared/ui/custom-checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { osnovanieFormSchema } from "../../schemas/osnovanie-form.schema";
import { useUpdateOsnovanie } from "../../hooks/use-update-osnovanie";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";

export interface OsnovanieFormProps {
  data?: ILeadformOsnovanie;
}
export const OsnovanieForm = ({ data }: OsnovanieFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateOsnovanie, error, loading } = useUpdateOsnovanie();
  const { control, handleSubmit, reset } = useForm<ILeadformOsnovanie>({
    resolver: zodResolver(osnovanieFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformOsnovanie) => {
    setSuccess(false);
    const result = await handlerUpdateOsnovanie(formData);
    if (result) {
    
      await refreshLeadConfig();
      setSuccess(true);
      
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
      <FormButtons
        loading={loading}
        success={success}
        handlerCancel={handlerCancel}
        error={error}
      />
    </form>
  );
};
