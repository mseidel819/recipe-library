"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSetTheme from "../hooks/useSetTheme";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeHook = useSetTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeHook}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
