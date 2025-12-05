import { useStep } from "@/shared/ui/step-context";
import { useEffect, useRef } from "react";

export const Captch = () => {
  const { nextStep } = useStep();
  const containerRef = useRef<HTMLDivElement>(null);
  function showMyCaptcha() {
    if (!containerRef.current) return;

    window.AwsWafCaptcha?.renderCaptcha(containerRef.current, {
      apiKey:
        "Yo+bq30jL6dGtfbDn9mqTCZWUpA7fPC356bcdIZoL/0oLLnmjBkPfiIoxG01Z/8QuORmwXidmFGNM0ScF8RjYth45BhwHu1UAzete9cl2hbxYR+Lc15v3eQuhaFba1v5t2+sjfLbW+WiGNB6h/7XPcPvGkiz+9Egf/S4LwRXHUEDqcVvLZFTkSNDSGVqeJDg+rp1o+Dvo5l3rdCeh4vIaI4EvauXH/x5OCvHY3FkO45ro0GtTRmx5DzZbDJnOnlweSsYClmsD7PzhzUUNi8MghKBxeLaqC4TvdR4mP2pMj4+15B0dR5xI0fGkU1fMCUg00f5wOd+ACTivMNkmGYl9te95Cg5iviOg5//W2n6oYBI9r/Wb9X3FR7UnSwB1MTWWBvFb69yyCNqltW37xE0RX2MRD8ayKmw7EBH67Ph31ilyFdDlEc3se7n+zrBqgtQ+jZuRaJiRrgf9AVA68j8xDFR7EXupgxsJwVOBf5KCRS6qMOCnGWFq/NyQ7YdAbCAwnF4cWluC3r9T2BMhqgqN70yk0WdtlUqJexTKadZavPRlIk9qOKxXvB/KWgGwx3zvNeTvQMX+edNyJAG4usdagnvVG/YUS/m9Bu8sZNTWtMwHcMAuzcLGAKTRWE7fisGbaMEdOejSgT+FJLeC5px9ks2WoJukJRi1ByMUkXIds8=_0_1",
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
