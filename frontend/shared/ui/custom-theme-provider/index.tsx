"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
