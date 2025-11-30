import { useStep } from "@/shared/ui/step-context";
import { useForm } from "react-hook-form";
import { InputsContacts } from "../inputs-contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingForm, bookingSchema } from "../../schemas";
import { contactSchema } from "../../schemas/contact.schema";

export const FormBooking = () => {
  const { step } = useStep();
  const { control, getValues, setError, clearErrors } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {},
  });
  const handlerContactPageNext = () => {
    const values = getValues();

    const result = contactSchema.safeParse(values);
    console.log(values);
    if (!result.success) {
      for (const [key, issues] of Object.entries(
        result.error.flatten().fieldErrors,
      )) {
        if (issues && issues.length > 0) {
          setError(key as keyof BookingForm, {
            type: "manual",
            message: issues[0],
          });
        }
      }
      return;
    }
    clearErrors();
    console.log("next");
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <InputsContacts control={control} />;
      case 2:
        return <div>Step 2 content</div>;
      case 3:
        return <div>Step 3 content</div>;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div>
      {renderStep()}
      <button onClick={handlerContactPageNext}>next</button>
    </div>
  );
};
