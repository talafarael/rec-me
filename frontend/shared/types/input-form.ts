import { FieldValues, Path } from "react-hook-form";

export type InputsType = "default" | "phone";
export interface IInputForm<T extends FieldValues> {
  name: Path<T>;
  field: string;
  type: InputsType;
}
