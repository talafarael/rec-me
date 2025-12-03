import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUrlParamStore } from "../store";
import { ISearchParams } from "../types/url-params";

export const useGetUrlsParams = () => {
  const searchParams = useSearchParams();
  const { loadParams } = useUrlParamStore();
  useEffect(() => {
    if (!searchParams) return;

    const params: ISearchParams = {
      pixel: searchParams.get("pixel") || undefined,
      sub1: searchParams.get("sub1") || undefined,
      sub2: searchParams.get("sub2") || undefined,
      sub3: searchParams.get("sub3") || undefined,
      sub4: searchParams.get("sub4") || undefined,
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
    };

    loadParams(params);
  }, [searchParams]);
  return searchParams;
};
