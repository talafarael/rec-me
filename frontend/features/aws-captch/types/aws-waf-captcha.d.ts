export interface AwsWafCaptchaOptions {
  apiKey: string;
  onSuccess: (wafToken: string) => void;
  onError: (error: string) => void;
}

export interface AwsWafCaptcha {
  renderCaptcha: (
    container: Element | null,
    options: AwsWafCaptchaOptions,
  ) => void;
}

declare global {
  interface Window {
    AwsWafCaptcha?: AwsWafCaptcha;
  }
}

declare const AwsWafCaptcha: AwsWafCaptcha;

export { };
