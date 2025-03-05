import { createContext, Dispatch, SetStateAction } from "react";
import { StoreContextType } from "../types/type";

export const StoreContext = createContext<{
  store: StoreContextType;
  setStore: Dispatch<SetStateAction<StoreContextType>>;
}>({
  store: {
    user: {},
    files: []
  },
  setStore: () => {},
});