"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/form-input";
import { CustomInput } from "@/shared/ui/custom-input";
import { BookingFieldInput } from "@/entities/booking-form/ui/field-input";
import { generateLinksFormSchema } from "../../schemas/generate-links-form.schema";
import { generateLinksFormData } from "./generate-link-form.data";
import { IGenerateUrl } from "../../types/generate-llink";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { useNotificationsStore } from "@/entities/notifications/store";
import { useState } from "react";
import { FormButtons } from "@/shared/ui/form-buttons";

export interface GenerateLinkFormProps {
  handlerCreateUrl: (data: IGenerateUrl) => void;
}
export const GenerateLinkForm = ({
  handlerCreateUrl,
}: GenerateLinkFormProps) => {
  const { config } = useLeadFormStore();
  const { notifications } = useNotificationsStore();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<IGenerateUrl>({
    resolver: zodResolver(generateLinksFormSchema),
    defaultValues: {
      baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL || "https://farael-frontend.esp.ovh",
    },
  });

  const validateBeforeSubmit = (data: IGenerateUrl) => {
    setError(undefined);
    setSuccess(false);
    setLoading(true);

    if (!config) {
      setError(
        "Lead form configuration is not set. Please configure the lead form first.",
      );
      setLoading(false);
      return;
    }

    if (!notifications) {
      setError(
        "Notifications configuration is not set. Please configure notifications first.",
      );
      setLoading(false);
      return;
    }
    const missingTokens: string[] = [];

    if (!notifications.telegramBotToken) {
      missingTokens.push("Telegram Bot Token");
    }
    if (!notifications.telegramChatId) {
      missingTokens.push("Telegram Chat ID");
    }
    if (!notifications.googleToken) {
      missingTokens.push("Google Token");
    }
    if (!notifications.googleSheetUrl) {
      missingTokens.push("Google Sheet URL");
    }

    if (missingTokens.length > 0) {
      setError(
        `Missing required tokens: ${missingTokens.join(", ")}. Please configure all notification tokens.`,
      );
      setLoading(false);
      return;
    }

    try {
      handlerCreateUrl(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handlerCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset({
      baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL || "https://farael-frontend.esp.ovh",
    });
  };
  return (
    <form
      className="mt-[50px] ml-[25px] gap-[10px] flex flex-col"
      onSubmit={handleSubmit(validateBeforeSubmit)}
    >
      {generateLinksFormData.map((elem) => (
        <FormInput<IGenerateUrl> key={elem.name} data={elem} control={control}>
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
                  value={value !== undefined ? String(value) : ""}
                />
              </BookingFieldInput>
            );
          }}
        </FormInput>
      ))}
      <FormButtons
        handlerCancel={handlerCancel}
        loading={loading}
        success={success}
        error={error}
      />
    </form>
  );
};
