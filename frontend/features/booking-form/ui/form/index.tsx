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

export const FormBooking = () => {
  const { step, nextStep } = useStep();
  const { params } = useUrlParamStore();
  const { handlerSendLead } = useSendLead();
  const {
    control,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    // formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      verifyCodePhone: "afa1",
    },
  });
  const handlerContactPageNext = () => {
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
    console.log(data);
    if (!params) return;
    const body: SendLeadDto = {
      ...data,
      name: data.fullName,
      ...params,
    };
    handlerSendLead(body);
  };
  return (
    <form onSubmit={handleSubmit(handlerSubmit)}>
      <BookingSteper
        handlerContactsPage={handlerContactPageNext}
        control={control}
      />
      <StepButtonBar
        childrenNextButton={
          step == 3 ? (
            <StepButton variant="submit" type="submit" />
          ) : (
            <StepButton variant="next" onClick={handlerContactPageNext} />
          )
        }
      />
    </form>
  );
};
