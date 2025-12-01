export interface FacebookPixel {
  (command: "init", pixelId: string): void;
  (command: "track", event: string, parameters?: Record<string, unknown>): void;
  (
    command: "trackCustom",
    event: string,
    parameters?: Record<string, unknown>,
  ): void;
  push: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: unknown[][];
  callMethod?: (method: string, ...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}
export {};
declare const fbq: {
  (command: "init", pixelId: string): void;
  (command: "track", event: string, parameters?: unknown): void;
};
