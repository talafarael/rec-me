import { useStep } from "@/shared/ui/step-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingForm, createBookingSchema } from "../../schemas";
import { contactSchema } from "../../schemas/contact.schema";
import { captchaSchema } from "../../schemas/captcha.schema";
import { StepButton, StepButtonBar } from "@/entities/step";
import { BookingSteper } from "@/widgets/booking-steper";
import { verifyCodeSchema } from "../../schemas/verify-code.schema";
import { useUrlParamStore } from "@/features/url-param/store";
import { useSendLead } from "@/features/lead";
import { SendLeadDto } from "@/features/lead/dto/send-lead.dto";
import { useRef } from "react";
import { CustomErrorText } from "@/shared/ui/custom-error-text";
import { FormStep } from "@/entities/step/enums/step.enum";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { createStep1Schema } from "../../schemas/step1.schema";

export const FormBooking = () => {
  const { currentStep, nextStep, step, steps } = useStep();
  const { params } = useUrlParamStore();
  const { config } = useLeadFormStore();
  const { handlerSendLead, error, loading } = useSendLead();
  const isSubmitAllowedRef = useRef(false);

  const isLastStep = step === steps.length - 1;

  const { control, getValues, setError, clearErrors, handleSubmit } =
    useForm<BookingForm>({
      resolver: zodResolver(createBookingSchema(config)),
      defaultValues: {},
    });
  const handlerContactPageNext = () => {
    clearErrors();

    const values = getValues();
    let result;
    switch (currentStep) {
      case FormStep.STEP1:
        // Validate step1 fields based on config
        const step1Schema = createStep1Schema(config?.step1 ?? null);
        result = step1Schema.safeParse(values);
        break;
      case FormStep.CONTACTS:
        result = contactSchema.safeParse(values);
        break;
      case FormStep.CAPTCHA:
        result = captchaSchema.safeParse(values);
        if (result.success && !values?.captchaPassed) {
          setError("captchaPassed" as keyof BookingForm, {
            type: "manual",
            message: "Please complete the captcha",
          });
          return;
        }
        break;
      case FormStep.VERIFY:
        result = verifyCodeSchema.safeParse(values);
        break;
      default:
        result = null;
    }

    if (result && !result.success) {
      const errors = result.error.flatten().fieldErrors;
      Object.entries(errors).forEach(([key, [message]]) => {
        if (message) {
          setError(key as keyof BookingForm, {
            type: "manual",
            message,
          });
        }
      });
      return;
    }
    clearErrors();
    nextStep();
  };
  const handlerSubmit = async (data: BookingForm) => {
    if (!isSubmitAllowedRef.current) {
      return;
    }
    if (!params) return;
    
    // Ensure pixel field is a valid string (handle potential JSON issues)
    const pixelValue = params.pixel || "";
    
    const body: SendLeadDto = {
      ...data,
      name: data.fullName,
      ...params,
      pixel: pixelValue,
    };
    const res = await handlerSendLead(body);
    if (res) {
      nextStep();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Always prevent default form submission
    if (isLastStep && !isSubmitAllowedRef.current) {
      return;
    }
    handleSubmit(handlerSubmit)(e);
  };

  return (
    <form
      className="flex flex-col justify-center items-center  h-[100%]"
      onSubmit={handleFormSubmit}
      noValidate
    >
      <BookingSteper
        handlerContactsPage={handlerContactPageNext}
        control={control as any}
      >
        <>
          <CustomErrorText message={error} />
          <StepButtonBar>
            {isLastStep ? (
              <StepButton
                variant="submit"
                type="submit"
                onClick={() => {
                  isSubmitAllowedRef.current = true;
                }}
                disabled={loading}
              />
            ) : (
              <StepButton
                variant="next"
                type="button"
                customTitle={config?.osnovanie?.forwardButtonText}
                onClick={handlerContactPageNext}
              />
            )}
          </StepButtonBar>
        </>
      </BookingSteper>
    </form>
  );
};
