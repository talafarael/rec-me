import { useStep } from "@/shared/ui/step-context";
import { useEffect, useRef } from "react";

export const Captch = () => {
  const { nextStep } = useStep();
  const containerRef = useRef<HTMLDivElement>(null);
  function showMyCaptcha() {
    if (!containerRef.current) return;

    window.AwsWafCaptcha?.renderCaptcha(containerRef.current, {
      apiKey:
        "M4TbgGvGg0oUf9KdRAFBOdIzuI8i6j8nJSsmRZZePzdbc/kpWEqUea/v6AfzKGLnouhc9wc6hj2YcG09wcbdPD9a6lP1qLzLbI+c027qMhH89FVwwVfRp+iPEuRluUtfrpmRgXzdSFzojhj/oc1qSjdvEgSewApJjtcxruCtRhiM81ldjeaG+HKhJOeZMynJ25CUbJGHxCRz1j/ppcs34WRiP/rb7vgFalkf4bKT2AR1weRusNBmJvS2fFNm6GKSBUu2ZKDqfKgUSNmWtT/kN0qwnzCiCckzJ4rP91nSkuilim3eArt1hUGqibZSej5YfNtrkq9TTesQR71BWSXXx1X7O59mKDQ0TQ+yfhW5sNRABoelTDFciKKydJM8sHkXvzH3uTForAscpzn/N651dt+NsC0/LULlGfOqrEOwavS108VJMRYZ3dmH59UuNGo7NBbl/E/g9zPo+l+e0/1v7Xi/l0TBL1Epu7y/yWTxXyLEIDBafOmbRM+8qJJx6VOLa+K7yiFI1BhOHepivNthWxuFAM+CczwxIbwQxq+rR3769wxrl+ZcxahCnbHNYJ4GUlKtbozqs+x8U1r9vU6ZVqk2A3PIVZpDdJ56LDA4nVocsTJ+Qw0iDHFC9oVXSd+zxmBXQPMo6idwksYIzOmXqv2hACgDh7VFX9pOuOjSPuE=_0_1",
      onSuccess: captchaExampleSuccessFunction,
      onError: captchaExampleErrorFunction,
    });
  }
  useEffect(() => {
    showMyCaptcha();
  }, []);
  function captchaExampleSuccessFunction(wafToken: string) {
    nextStep();
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
