import { createContext, useContext } from "react";

export const ScrollContext = createContext({ trigger: false });

export const useScrollContext = () => useContext(ScrollContext);
