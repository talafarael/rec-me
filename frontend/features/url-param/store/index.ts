"use client";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IUrlParams, urlParamsSchema } from "../schemas/url-prams.schema";
import { ZodIssue } from "zod";
import { ISearchParams } from "@/entities/url/types";

export interface IUrlParamStore {
  params: IUrlParams | null;
  loading: boolean;
  error?: ZodIssue[];
  loadParams: (params: ISearchParams | null) => void;
}

const localMiddlewares = (f: StateCreator<IUrlParamStore>) =>
  devtools(
    persist(f, {
      name: "url-param",
      storage: createJSONStorage(() => localStorage),
    }),
  );

export const useUrlParamStore = create<IUrlParamStore>()(
  localMiddlewares((set) => ({
    params: null,
    loading: true,
    loadParams: (params: ISearchParams | null) => {
      const result = urlParamsSchema.safeParse(params);

      if (result.success) {
        set({ params: result.data, loading: false, error: undefined });
      } else {
        console.log(result.error.issues);
        set({ params: null, loading: false, error: result.error.issues });
      }
    },
  })),
);
