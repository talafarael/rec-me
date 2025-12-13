"use client";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ILeadformNotifications } from "@/entities/token/types/token";

export interface INotificationsStore {
  notifications: ILeadformNotifications | null;
  loading: boolean;
  error?: string;
  loadNotifications: (notifications: ILeadformNotifications | null) => void;
  setNotifications: (notifications: ILeadformNotifications | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  clearNotifications: () => void;
}

const localMiddlewares = (f: StateCreator<INotificationsStore>) =>
  devtools(
    persist(f, {
      name: "notifications",
      storage: createJSONStorage(() => localStorage),
    }),
  );

export const useNotificationsStore = create<INotificationsStore>()(
  localMiddlewares((set) => ({
    notifications: null,
    loading: true,
    loadNotifications: (notifications: ILeadformNotifications | null) => {
      set({ notifications, loading: false, error: undefined });
    },
    setNotifications: (notifications: ILeadformNotifications | null) => {
      set({ notifications, loading: false, error: undefined });
    },
    setLoading: (loading: boolean) => {
      set({ loading });
    },
    setError: (error: string | undefined) => {
      set({ error });
    },
    clearNotifications: () => {
      set({ notifications: null, loading: false, error: undefined });
    },
  })),
);

