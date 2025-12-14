import { ILeadformSettings } from "@/entities/lead-form/types/lead-form";
import { FormStep } from "../enums/step.enum";
import { FinallyStep } from "@/entities/step/whats-app/ui/finally-step";
import { Captch } from "@/features/aws-captch/ui/captcha";
import { InputsContacts } from "@/features/booking-form/ui/inputs-contacts";
import { InputsStep1 } from "@/features/booking-form/ui/inputs-step1";
import { VerifyCode } from "@/features/verify-code";
import { Control } from "react-hook-form";
import { ReactNode } from "react";

export interface FormStepConfig {
  key: FormStep;
  enabledBy: keyof ILeadformSettings;
  render: (control: Control<any>) => ReactNode;
  showButton?: boolean;
}
export const STEPS: FormStepConfig[] = [
  {
    key: FormStep.STEP1,
    enabledBy: "step1",
    render: (control: any) => <InputsStep1 control={control} />,
    showButton: true,
  },
  {
    key: FormStep.CONTACTS,
    enabledBy: "step2",
    render: (control: any) => <InputsContacts control={control} />,
    showButton: true,
  },
  {
    key: FormStep.CAPTCHA,
    enabledBy: "captcha",
    render: (control: any) => <Captch control={control} />,
    showButton: true,
  },
  {
    key: FormStep.VERIFY,
    enabledBy: "notifications",
    render: (control: any) => <VerifyCode control={control} />,
    showButton: true,
  },
  {
    key: FormStep.FINAL,
    enabledBy: "step2",
    render: () => <FinallyStep />,
    showButton: false,
  },
];
