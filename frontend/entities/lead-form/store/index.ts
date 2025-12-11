"use client";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ILeadformConfig } from "../types/lead-form";

export interface ILeadFormStore {
  config: ILeadformConfig | null;
  loading: boolean;
  error?: string;
  loadConfig: (config: ILeadformConfig | null) => void;
  setConfig: (config: ILeadformConfig | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  clearConfig: () => void;
}

const localMiddlewares = (f: StateCreator<ILeadFormStore>) =>
  devtools(
    persist(f, {
      name: "lead-form",
      storage: createJSONStorage(() => localStorage),
    }),
  );

export const useLeadFormStore = create<ILeadFormStore>()(
  localMiddlewares((set) => ({
    config: null,
    loading: true,
    loadConfig: (config: ILeadformConfig | null) => {
      set({ config, loading: false, error: undefined });
    },
    setConfig: (config: ILeadformConfig | null) => {
      set({ config, loading: false, error: undefined });
    },
    setLoading: (loading: boolean) => {
      set({ loading });
    },
    setError: (error: string | undefined) => {
      set({ error });
    },
    clearConfig: () => {
      set({ config: null, loading: false, error: undefined });
    },
  })),
);
