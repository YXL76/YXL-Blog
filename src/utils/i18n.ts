import { createContext, useContext } from "react";
import type { Languages } from "../../config";
import createPersistedState from "use-persisted-state";
import { defaultLanguage } from "../../config";

const useLocateState = createPersistedState("gatsby-intl");

export const useLocate = () => {
  const [locate, setLocate] = useLocateState(defaultLanguage);

  return {
    locate,
    setLocate,
  };
};

export const LocateContext = createContext({
  locate: defaultLanguage,
  setLocate: (_: Languages) => {},
});

export const useLocateContext = () => useContext(LocateContext);
