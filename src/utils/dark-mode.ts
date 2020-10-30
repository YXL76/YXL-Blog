import { createContext, useCallback, useContext } from "react";
import createPersistedState from "use-persisted-state";

const useDarkModeState = createPersistedState("gatsby-dark-mode");

export const useDarkMode = (initial: boolean) => {
  const [darkMode, setDarkMode] = useDarkModeState(initial);

  return {
    darkMode,
    toggleDarkMode: useCallback(() => setDarkMode((current) => !current), [
      setDarkMode,
    ]),
  };
};

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkModeContext = () => useContext(DarkModeContext);
