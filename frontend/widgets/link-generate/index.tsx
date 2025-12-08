"use client";
import { useState } from "react";

import { IGenerateUrl } from "@/features/generate-link-form/types/generate-llink";
import { GenerateLinkForm } from "@/features/generate-link-form/ui/generate-link-form";
import { ClipboardGenerateUrl } from "@/entities/url/ui/clipboard-generate-url";

export const GenerateLink = () => {
  const [url, setUrl] = useState<string>();
  const handlerCreateUrl = (data: IGenerateUrl) => {
    const params = new URLSearchParams({
      pixel: data.pixel,
      sub1: data.sub1,
      sub2: data.sub2,
      sub3: data.sub3,
      sub4: data.sub4,
    });

    setUrl(`${data.baseUrl}/booking?${params.toString()}`);
  };
  return (
    <div className="w-[100%] flex h-[100%] flex-col justify-center items-center px-[20px]">
      <div className="w-full max-w-[600px]">
        <ClipboardGenerateUrl url={url} />
        <GenerateLinkForm handlerCreateUrl={handlerCreateUrl} />
      </div>
    </div>
  );
};
