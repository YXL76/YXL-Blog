import { DarkModeContext, useDarkMode } from "../../utils";
import React, { useEffect } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@material-ui/core";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import { darkTheme } from "../theme";
import { useMediaQuery } from "../../components";

interface TopLayoutProps {
  children: ReactNode;
  theme: Theme;
}

export default function TopLayout({ children, theme }: TopLayoutProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { darkMode, toggleDarkMode } = useDarkMode(prefersDarkMode);

  useEffect(() => {
    const setProperty = (property: string, value: string) => {
      document.documentElement.style.setProperty(property, value);
    };
    const t = darkMode ? darkTheme : theme;
    setProperty("--primary-light", t.palette.primary.light);
    setProperty("--primary-main", t.palette.primary.main);
    setProperty("--primary-dark", t.palette.primary.dark);
    setProperty("--divider", t.palette.divider);
    setProperty("--text", t.palette.text.primary);
    setProperty("--bg", t.palette.background.default);
  }, [darkMode, theme]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeTopLayout theme={darkMode ? darkTheme : theme}>
        {children}
      </ThemeTopLayout>
    </DarkModeContext.Provider>
  );
}
