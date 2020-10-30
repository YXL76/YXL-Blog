import {
  DarkModeContext,
  LocateContext,
  useDarkMode,
  useLocate,
} from "../../utils";
import React, { useEffect } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@material-ui/core";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import { darkTheme } from "../theme";
import { message } from "../../i18n";
import { useMediaQuery } from "../../components";

interface TopLayoutProps {
  children: ReactNode;
  theme: Theme;
}

export default function TopLayout({ children, theme }: TopLayoutProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { darkMode, toggleDarkMode } = useDarkMode(prefersDarkMode);
  const { locate, setLocate } = useLocate();

  useEffect(() => {
    const t = darkMode ? darkTheme : theme;
    document.documentElement.style.setProperty(
      "--primary-light",
      t.palette.primary.light
    );
    document.documentElement.style.setProperty(
      "--primary-main",
      t.palette.primary.main
    );
    document.documentElement.style.setProperty(
      "--primary-dark",
      t.palette.primary.dark
    );
    document.documentElement.style.setProperty("--divider", t.palette.divider);
    document.documentElement.style.setProperty(
      "--text",
      t.palette.text.primary
    );
    document.documentElement.style.setProperty(
      "--bg",
      t.palette.background.default
    );
  }, [darkMode, theme]);

  return (
    <LocateContext.Provider
      value={{ locate, setLocate, message: message[locate] }}
    >
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <ThemeTopLayout theme={darkMode ? darkTheme : theme}>
          {children}
        </ThemeTopLayout>
      </DarkModeContext.Provider>
    </LocateContext.Provider>
  );
}
