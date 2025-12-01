import { PixelEvent } from "../enums/events.enum";
import { FacebookPixel } from "../types/fbq";

export const sendPixel = (pixelId: string, events: PixelEvent) => {
  if (!window.fbq) {
    (function (
      f: Window & typeof globalThis,
      b: Document,
      e: string,
      v: string,
    ) {
      if (f.fbq) return;

      const queue: unknown[][] = [];
      const fbqFunction = function (
        command: "init" | "track" | "trackCustom",
        ...args: unknown[]
      ): void {
        if (fbqFunction.callMethod) {
          fbqFunction.callMethod(command, ...args);
        } else {
          queue.push([command, ...args]);
        }
      } as FacebookPixel;

      fbqFunction.push = (...args: unknown[]): void => {
        const [command, ...rest] = args;
        if (command === "init" || command === "track" || command === "trackCustom") {
          (fbqFunction as (command: string, ...args: unknown[]) => void)(command, ...rest);
        }
      };
      fbqFunction.loaded = true;
      fbqFunction.version = "2.0";
      fbqFunction.queue = queue;

      f.fbq = fbqFunction;
      if (!f._fbq) f._fbq = fbqFunction;

      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }

      console.log("work");
      fbqFunction("init", pixelId);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
  }

  if (window.fbq) {
    window.fbq("track", events);
  }
};
