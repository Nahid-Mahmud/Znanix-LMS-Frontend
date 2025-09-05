"use client";

import store from "@/redux/store";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster, type ToasterProps } from "sonner";

interface PageProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: PageProps) {
  const { resolvedTheme } = useTheme();
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" richColors={true} offset={16} theme={resolvedTheme as ToasterProps["theme"]} />
    </Provider>
  );
}
