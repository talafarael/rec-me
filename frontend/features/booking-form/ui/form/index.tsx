import { useStep } from "@/shared/ui/step-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingForm, bookingSchema } from "../../schemas";
import { contactSchema } from "../../schemas/contact.schema";
import { StepButton, StepButtonBar } from "@/entities/step";
import { BookingSteper } from "@/widgets/booking-steper";
import { verifyCodeSchema } from "../../schemas/verify-code.schema";

export const FormBooking = () => {
  const { step, nextStep } = useStep();
  const { control, getValues, setError, clearErrors } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {},
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
  return (
    <div>
      <BookingSteper
        handlerContactsPage={handlerContactPageNext}
        control={control}
      />
      <StepButtonBar
        childrenNextButton={
          <StepButton variant="next" onClick={handlerContactPageNext} />
        }
      />
    </div>
  );
};
