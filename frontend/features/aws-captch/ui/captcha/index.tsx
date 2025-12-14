import { BookingForm } from "@/features/booking-form/schemas";
import { useStep } from "@/shared/ui/step-context";
import { useEffect, useRef } from "react";
import { Control, useController } from "react-hook-form";

export interface CaptchProps {
  control: Control<BookingForm>;
}

export const Captch = ({ control }: CaptchProps) => {
  const { field } = useController({
    control,
    name: "captchaPassed" as any,
    defaultValue: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  function showMyCaptcha() {
    if (!containerRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_AWS_WAF_CAPTCHA_API_KEY;
    if (!apiKey) {
      console.error("AWS WAF Captcha API key is not configured");
      return;
    }

    window.AwsWafCaptcha?.renderCaptcha(containerRef.current, {
      apiKey,
      onSuccess: captchaExampleSuccessFunction,
      onError: captchaExampleErrorFunction,
    });
  }
  useEffect(() => {
    showMyCaptcha();
  }, []);
  function captchaExampleSuccessFunction(wafToken: string) {
    field.onChange(true);
  }

  function captchaExampleErrorFunction() {
    console.log("error");
  }
  return (
    <div
      className="bg-[white] p-[20px] rounded-[15px]"
      id="my-captcha-container"
      ref={containerRef}
    >
      hell
    </div>
  );
};
