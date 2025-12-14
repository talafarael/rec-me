import { getInputsStep1Data } from "./inputs-step1.data";
import { Control } from "react-hook-form";
import { BookingForm } from "../../schemas";
import { useLeadFormStore } from "@/entities/lead-form/store";
import { CustomInputs } from "@/shared/ui/custom-inputs";

export interface InputsStep1Props {
  control: Control<BookingForm>;
}
export const InputsStep1 = ({ control }: InputsStep1Props) => {
  const { config } = useLeadFormStore();
  const inputsStep1Data = getInputsStep1Data(config);
  return (
    <div className="flex flex-col gap-[12px]">
      <CustomInputs type="default" control={control} data={inputsStep1Data} />
    </div>
  );
};
