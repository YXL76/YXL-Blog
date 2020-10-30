import { createContext, useCallback, useContext } from "react";
import type { Languages } from "../../config";
import createPersistedState from "use-persisted-state";
import { defaultLanguage } from "../../config";

const useLocateState = createPersistedState("gatsby-intl");

export const useLocate = () => {
  const [locate, setLocate] = useLocateState(defaultLanguage as Languages);

  return {
    locate,
    setLocate: useCallback((l) => setLocate(l), [setLocate]),
  };
};

export const LocateContext = createContext({
  locate: defaultLanguage,
  setLocate: (_: Languages) => {},
  message: {} as Record<string, string>,
});

export const useLocateContext = () => useContext(LocateContext);
