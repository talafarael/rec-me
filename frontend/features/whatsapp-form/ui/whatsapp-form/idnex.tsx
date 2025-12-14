import { FormInput } from "@/shared/ui/form-input";
import { whatsappFormData } from "./whatsapp-form.data";
import { ILeadformWhatsapp } from "@/entities/whatsapp/types/whatsapp";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { CustomCheckbox } from "@/shared/ui/custom-checkbox";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { whatsappFormSchema } from "../../schemas/whatsapp-form.schema";
import { useUpdateWhatsapp } from "../../hooks/use-update-whatsapp";
import { refreshLeadConfig } from "@/features/lead-config/lib";
import { useState, useMemo } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";
import { CustomTextarea } from "@/shared/ui/custom-textarea";

export interface WhatsappFormProps {
  data?: ILeadformWhatsapp;
}
export const WhatsappForm = ({ data }: WhatsappFormProps) => {
  const [success, setSuccess] = useState(false);
  const { handlerUpdateWhatsapp, error, loading } = useUpdateWhatsapp();
  const { control, handleSubmit, reset } = useForm<ILeadformWhatsapp>({
    resolver: zodResolver(whatsappFormSchema),
    defaultValues: data,
  });

  const linkTemplate = useWatch({ control, name: "linkTemplate" });
  const contactNumbers = useWatch({ control, name: "contactNumbers" });
  const messageTemplate = useWatch({ control, name: "messageTemplate" });

  const generatedLink = useMemo(() => {
    if (linkTemplate) {
      let link = linkTemplate;

      if (contactNumbers) {
        const cleanPhone = contactNumbers.replace(/\D/g, "");

        link = link.replace(/%phone%/g, cleanPhone);
        link = link.replace(/%Phone%/g, cleanPhone);
        link = link.replace(/%PHONE%/g, cleanPhone);
        link = link.replace(/{phone}/g, cleanPhone);
        link = link.replace(/{Phone}/g, cleanPhone);
        link = link.replace(/{PHONE}/g, cleanPhone);
        link = link.replace(/{contactNumbers}/g, cleanPhone);
      }

      if (messageTemplate) {
        const encodedMessage = encodeURIComponent(messageTemplate);

        link = link.replace(/%message%/g, encodedMessage);
        link = link.replace(/%Message%/g, encodedMessage);
        link = link.replace(/%MESSAGE%/g, encodedMessage);
        link = link.replace(/{message}/g, encodedMessage);
        link = link.replace(/{Message}/g, encodedMessage);
        link = link.replace(/{MESSAGE}/g, encodedMessage);
        link = link.replace(/{messageTemplate}/g, encodedMessage);
        link = link.replace(/{encodedMessage}/g, encodedMessage);
      }

      return link;
    }

    if (contactNumbers) {
      const phone = contactNumbers.replace(/\D/g, "");
      let url = `https://wa.me/${phone}`;
      if (messageTemplate) {
        const encodedMessage = encodeURIComponent(messageTemplate);
        url += `?text=${encodedMessage}`;
      }
      return url;
    }

    return "";
  }, [linkTemplate, contactNumbers, messageTemplate]);

  const handleFormSubmit = async (formData: ILeadformWhatsapp) => {
    setSuccess(false);
    const result = await handlerUpdateWhatsapp({
      ...formData,
      linkTemplate: generatedLink,
    });
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
      className=" mt-[50px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        name="linkTemplate"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />

      {whatsappFormData.map((elem) => {
        if (elem.type === "textBlock") {
          return (
            <div key={elem.name} className="mb-6 w-[560px]">
              <p>
                {`{id}, {date}, {time}, {filed_1}, {filed_2}, {filed_3}, {name_surname}, {phone}, {email}`}
              </p>
              <div className="mt-2 w-[500px]">
                <span className="font-semibold">Пример ссылки: </span>
                {generatedLink ? (
                  <span className="break-all">{generatedLink}</span>
                ) : (
                  <span className="text-gray-400">
                    Введите номер контакта для генерации ссылки
                  </span>
                )}
              </div>
            </div>
          );
        }

        if (elem.type === "checkbox") {
          return (
            <FormInput<ILeadformWhatsapp>
              key={elem.name}
              data={elem}
              control={control}
            >
              {(field, fieldErrors) => {
                const { value, ...restField } = field;
                return (
                  <div className="flex items-center  gap-2">
                    <CustomCheckbox
                      {...restField}
                      checked={value as boolean}
                      className="w-5 h-5 accent-black"
                    />
                    <label className="text-[16px] text-black">
                      {elem.field}
                    </label>
                  </div>
                );
              }}
            </FormInput>
          );
        }

        return (
          <FormInput<ILeadformWhatsapp>
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
                  {elem.type === "textarea" ? (
                    <CustomTextarea
                      variant="admin"
                      {...restField}
                      value={value as string}
                    />
                  ) : (
                    <CustomInput
                      variant="admin"
                      {...restField}
                      value={value as string}
                    />
                  )}
                </BookingFieldInput>
              );
            }}
          </FormInput>
        );
      })}

      <FormButtons
        loading={loading}
        success={success}
        handlerCancel={handlerCancel}
        error={error}
      />
    </form>
  );
};
