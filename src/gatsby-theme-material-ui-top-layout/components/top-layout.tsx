import { Layout, useMediaQuery, useScrollTrigger } from "../../components";
import { LocateContext, ScrollContext, useLocate } from "../../utils";
import React, { useEffect } from "react";
import theme, { darkTheme } from "../theme";
import type { ReactNode } from "react";
import type { Theme } from "@material-ui/core";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import createPersistedState from "use-persisted-state";
import { message } from "../../i18n";

const useDarkModeState = createPersistedState("gatsby-dark-mode");

interface TopLayoutProps {
  children: ReactNode;
  theme: Theme;
}

export default function TopLayout({ children }: TopLayoutProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, toggleDarkMode] = useDarkModeState(prefersDarkMode);
  const trigger = useScrollTrigger();
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
  }, [darkMode]);

  return (
    <LocateContext.Provider
      value={{ locate, setLocate, message: message[locate] }}
    >
      <ScrollContext.Provider value={{ trigger }}>
        <ThemeTopLayout theme={darkMode ? darkTheme : theme}>
          <Layout
            trigger={trigger}
            darkMode={darkMode}
            toggleDarkMode={() => toggleDarkMode((current) => !current)}
          >
            {children}
          </Layout>
        </ThemeTopLayout>
      </ScrollContext.Provider>
    </LocateContext.Provider>
  );
}
