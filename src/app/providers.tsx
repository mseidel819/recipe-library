"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useSetTheme from "../hooks/useSetTheme";
import NavBar from "../components/nav-bar/nav-bar.component";

const queryClient = new QueryClient();

export default function QueryProvider({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  const themeHook = useSetTheme();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themeHook}>
          <CssBaseline />
          <div>
            <NavBar />
            {children}
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
