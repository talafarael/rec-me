"use client";
import { useState } from "react";

export interface ClipboardGenerateUrlProps {
  url?: string;
}

export const ClipboardGenerateUrl = ({ url }: ClipboardGenerateUrlProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!url) return null;

  return (
    <div className="w-[100%] flex flex-col gap-[16px]  items-center mb-[32px] animate-fadeIn">
      <div className="w-full max-w-[600px]">
        <label className="block text-sm font-medium text-gray-300 mb-[8px] ml-[4px]">
          Generated URL
        </label>
        <div className="flex gap-[12px] items-center">
          <div className="relative flex-1 group">
            <input
              type="text"
              value={url}
              readOnly
              className="w-full pl-[16px] pr-[12px] h-[57px] rounded-[15px] border-2 border-gray-600 bg-gray-800 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-text"
            />
            <div className="absolute inset-0 rounded-[15px] bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
          <button
            onClick={handleCopy}
            className={`px-[24px] h-[57px] rounded-[15px] font-medium text-white transition-all duration-200 flex items-center gap-[8px] min-w-[120px] justify-center shadow-lg ${copied
                ? "bg-green-500 hover:bg-green-600 scale-105"
                : "bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-95"
              }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
