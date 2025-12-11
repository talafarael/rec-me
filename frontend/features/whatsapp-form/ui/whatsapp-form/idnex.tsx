import { FormInput } from "@/shared/ui/form-input";
import { whatsappFormData } from "./whatsapp-form.data";
import { ILeadformWhatsapp } from "@/entities/whatsapp/types/whatsapp";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { CustomCheckbox } from "@/shared/ui/custom-checkbox";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/shared/ui/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { whatsappFormSchema } from "../../schemas/whatsapp-form.schema";
import { useUpdateWhatsapp } from "../../hooks/use-update-whatsapp";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";

export interface WhatsappFormProps {
  data?: ILeadformWhatsapp;
}
export const WhatsappForm = ({ data }: WhatsappFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateWhatsapp, error, loading } = useUpdateWhatsapp();
  const { control, handleSubmit } = useForm<ILeadformWhatsapp>({
    resolver: zodResolver(whatsappFormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformWhatsapp) => {
    setSuccess(false);
    const result = await handlerUpdateWhatsapp(formData);
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
      {whatsappFormData.map((elem) => (
        <FormInput<ILeadformWhatsapp>
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
