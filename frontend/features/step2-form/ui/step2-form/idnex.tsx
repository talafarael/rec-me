import { FormInput } from "@/shared/ui/form-input";
import { step2FormData } from "./step2-form.data";
import { ILeadformStep2 } from "@/entities/step2/types/step2";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2FormSchema } from "../../schemas/step2-form.schema";
import { useUpdateStep2 } from "../../hooks/use-update-step2";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";

export interface Step2FormProps {
  data?: ILeadformStep2;
}
export const Step2Form = ({ data }: Step2FormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateStep2, error, loading } = useUpdateStep2();
  const { control, handleSubmit, reset } = useForm<ILeadformStep2>({
    resolver: zodResolver(step2FormSchema),
    defaultValues: data,
  });
  const handleFormSubmit = async (formData: ILeadformStep2) => {
    setSuccess(false);
    const result = await handlerUpdateStep2(formData);
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
      className="mt-[50px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {step2FormData.map((elem) => (
        <FormInput<ILeadformStep2>
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
