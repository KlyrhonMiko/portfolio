"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "@ecosy/next-themes";
import type { ThemeProviderProps } from "@ecosy/next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
