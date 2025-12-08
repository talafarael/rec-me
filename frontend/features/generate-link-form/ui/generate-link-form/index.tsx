"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/form-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { generateLinksFormSchema } from "../../schemas/generate-links-form.schema";
import { generateLinksFormData } from "./generate-link-form.data";
import { IGenerateUrl } from "../../types/generate-llink";

export interface GenerateLinkFormProps {
  handlerCreateUrl: (data: IGenerateUrl) => void;
}
export const GenerateLinkForm = ({
  handlerCreateUrl,
}: GenerateLinkFormProps) => {
  const { control, handleSubmit } = useForm<IGenerateUrl>({
    resolver: zodResolver(generateLinksFormSchema),
    defaultValues: {
      baseUrl: "https://farael-frontend.esp.ovh",
    },
  });

  return (
    <form
      className="flex flex-col justify-center items-center h-[100%]"
      onSubmit={handleSubmit(handlerCreateUrl)}
    >
      <div className="flex flex-col gap-[12px]">
        {generateLinksFormData.map((elem) => (
          <FormInput<IGenerateUrl>
            key={elem.name}
            data={elem}
            control={control}
          >
            {(field, fieldErrors) => (
              <BookingFieldInput title={elem.field} fieldErrors={fieldErrors}>
                <CustomInput {...field} />
              </BookingFieldInput>
            )}
          </FormInput>
        ))}
        <button
          type="submit"
          className="w-[352px] mt-[20px] h-[57px] rounded-[15px] bg-blue-500 text-white"
        >
          create
        </button>
      </div>
    </form>
  );
};
