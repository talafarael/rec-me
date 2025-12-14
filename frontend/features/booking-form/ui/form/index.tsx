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

export const FormBooking = () => {
  const { currentStep, nextStep, step, steps } = useStep();
  const { params } = useUrlParamStore();
  const { config } = useLeadFormStore();
  const { handlerSendLead, error, loading } = useSendLead();
  const isSubmitAllowedRef = useRef(false);

  const isLastStep = step === steps.length - 1;

  const { control, getValues, setError, clearErrors, handleSubmit } =
    useForm<BookingForm>({
      resolver: zodResolver(createBookingSchema(config?.settings ?? null)),
      defaultValues: {},
    });
  const handlerContactPageNext = () => {
    clearErrors();

    const values = getValues();
    let result;
    switch (currentStep) {
      case FormStep.STEP1:
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
    const body: SendLeadDto = {
      ...data,
      name: data.fullName,
      ...params,
    };
    const res = await handlerSendLead(body);
    if (res) {
      nextStep();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isLastStep && !isSubmitAllowedRef.current) {
      e.preventDefault();
      return;
    }
    handleSubmit(handlerSubmit)(e);
  };

  return (
    <form
      className="flex flex-col justify-center items-center  h-[100%]"
      onSubmit={handleFormSubmit}
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
