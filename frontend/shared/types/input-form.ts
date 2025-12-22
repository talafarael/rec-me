import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";

export type InputsType =
  | "default"
  | "phone"
  | "checkbox"
  | "textarea"
  | "textBlock"
  | "color"
  | "file";
export type IInputForm<T extends FieldValues> = {
  name: Path<T>;
  field: string;
  type: Exclude<InputsType, "textBlock">;
};

export type IInputFormText<T extends FieldValues> =
  | {
      name: Path<T>;
      field: string;
      type: Exclude<InputsType, "textBlock">;
    }
  | {
      name: string;
      type: "textBlock";
      field: ReactNode | ((data: T) => ReactNode);
    };
