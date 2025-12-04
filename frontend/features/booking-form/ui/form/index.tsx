import { useStep } from "@/shared/ui/step-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingForm, bookingSchema } from "../../schemas";
import { contactSchema } from "../../schemas/contact.schema";
import { StepButton, StepButtonBar } from "@/entities/step";
import { BookingSteper } from "@/widgets/booking-steper";
import { verifyCodeSchema } from "../../schemas/verify-code.schema";
import { useUrlParamStore } from "@/features/url-param/store";
import { useSendLead } from "@/features/lead";
import { SendLeadDto } from "@/features/lead/dto/send-lead.dto";
import { useRef, useEffect } from "react";
import { CustomErrorText } from "@/shared/ui/custom-error-text";

export const FormBooking = () => {
  const { step, nextStep } = useStep();
  const { params } = useUrlParamStore();
  const { handlerSendLead, error, loading } = useSendLead();
  const isSubmitAllowedRef = useRef(false);

  useEffect(() => {
    if (step === 3) {
      isSubmitAllowedRef.current = false;
      const timer = setTimeout(() => {
        isSubmitAllowedRef.current = true;
      }, 300);
      return () => clearTimeout(timer);
    } else {
      isSubmitAllowedRef.current = true;
    }
  }, [step]);

  const { control, getValues, setError, clearErrors, handleSubmit } =
    useForm<BookingForm>({
      resolver: zodResolver(bookingSchema),
      defaultValues: {},
    });
  const handlerContactPageNext = () => {
    clearErrors();

    const values = getValues();
    let result;
    switch (step) {
      case 1:
      case 2:
        result = contactSchema.safeParse(values);
        break;
      case 3:
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
  const handlerSubmit = (data: BookingForm) => {
    if (!isSubmitAllowedRef.current) {
      return;
    }
    console.log(data);
    if (!params) return;
    const body: SendLeadDto = {
      ...data,
      name: data.fullName,
      ...params,
    };
    handlerSendLead(body);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (step === 3 && !isSubmitAllowedRef.current) {
      e.preventDefault();
      return;
    }
    handleSubmit(handlerSubmit)(e);
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-[-3%] h-[100%]"
      onSubmit={handleFormSubmit}
    >
      <BookingSteper
        handlerContactsPage={handlerContactPageNext}
        control={control}
      />
      <CustomErrorText message={error} />
      <StepButtonBar
        childrenNextButton={
          step == 3 ? (
            <StepButton
              variant="submit"
              type="submit"
              onClick={(e) => {
                isSubmitAllowedRef.current = true;
              }}
            />
          ) : (
            <StepButton
              disabled={loading}
              variant="next"
              type="button"
              onClick={handlerContactPageNext}
            />
          )
        }
      />
    </form>
  );
};
