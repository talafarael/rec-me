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

// Custom JSON storage with error handling for corrupted JSON
const createSafeJSONStorage = () => {
  const baseStorage = localStorage;
  return {
    getItem: (name: string): string | null => {
      try {
        const item = baseStorage.getItem(name);
        if (item === null) return null;
        // Validate JSON before returning
        JSON.parse(item);
        return item;
      } catch (error) {
        console.error("Error reading corrupted JSON from localStorage:", error);
        // Clear corrupted data
        try {
          baseStorage.removeItem(name);
        } catch {
          // Ignore errors when clearing
        }
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        // Validate JSON before storing
        JSON.parse(value);
        baseStorage.setItem(name, value);
      } catch (error) {
        console.error("Error writing invalid JSON to localStorage:", error);
      }
    },
    removeItem: (name: string): void => {
      try {
        baseStorage.removeItem(name);
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
    },
  };
};

const localMiddlewares = (f: StateCreator<IUrlParamStore>) =>
  devtools(
    persist(f, {
      name: "url-param",
      storage: createJSONStorage(() => createSafeJSONStorage()),
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
