import { ILeadformStep1 } from "@/entities/step1/types/step1";
import { IInputForm } from "@/shared/types/input-form";
import { useMemo } from "react";
import {
  Path,
  UseFormGetValues,
  UseFormSetValue,
  useWatch,
  Control,
} from "react-hook-form";

interface UseStep1DataFormProps {
  control: Control<ILeadformStep1>;
  getValues: UseFormGetValues<ILeadformStep1>;
  setValue: UseFormSetValue<ILeadformStep1>;
}

export const useStep1DataForm = ({
  control,
  getValues,
  setValue,
}: UseStep1DataFormProps) => {
  const MAX_FIELDS = 3;

  const fieldsCount =
    useWatch({
      control,
      name: "fieldsCount",
      defaultValue: getValues("fieldsCount") ?? 0,
    }) ?? 0;

  const step1FormData = useMemo<IInputForm<ILeadformStep1>[]>(() => {
    const fields: IInputForm<ILeadformStep1>[] = [];

    const currentCount = fieldsCount || 0;
    for (let i = 1; i < currentCount + 1; i++) {
      fields.push({
        name: `field${i}Placeholder` as Path<ILeadformStep1>,
        field: `Плейсхолдер поля ${i}`,
        type: "default",
      });
    }

    return fields;
  }, [fieldsCount]);

  const handleIncreaseFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const currentCount = getValues("fieldsCount") ?? 0;
    if (currentCount < MAX_FIELDS) {
      setValue("fieldsCount", currentCount + 1);
    }
  };

  const handleDecreaseFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const currentCount = getValues("fieldsCount") ?? 0;
    if (currentCount > 0) {
      setValue("fieldsCount", currentCount - 1);
    }
  };

  return {
    step1FormData,
    handleIncreaseFields,
    handleDecreaseFields,
    fieldsCount,
    MAX_FIELDS,
  };
};
