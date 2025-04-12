import { createContext, ReactNode, useReducer, Reducer, useMemo } from "react";
import { headers } from "../constants";
import {CredentialResponse} from "@react-oauth/google";

export interface State {
  activePolaroidBase: string;
  selectedImages: File[];
  importedImages: File[];
  borderOption: string;
  visibleRange: number[];
  isDone: boolean;
  isSuccessful: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
}
interface Action {
  type: string;
  optionKey?: keyof State;
  payload?: string[] | number[] | string | boolean | CredentialResponse | File[] | null; 
}
type Dispatch = (action: Action) => void;
interface AppProviderProps {
  children: ReactNode;
}
const initialState = {
  activePolaroidBase: headers[0]?.name,
  selectedImages: [],
  importedImages: [],
  borderOption: "White",
  visibleRange: [0,1],
  isDone: false,
  isSuccessful: false,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
  accessToken: "",
  refreshToken: "",
};
export const AppStateContext = createContext<State | undefined>(undefined);
export const AppDispathContext = createContext<Dispatch | undefined>(undefined);
const DashboardReducer = (state: State, action: Action) => {
  const { type, payload, optionKey } = action;
  switch (type) {
    case "SET_SELECTED":
      if(optionKey === "isAuthenticated"){
        localStorage.setItem("isAuthenticated", JSON.stringify(payload));
      }
      return optionKey ? { ...state, [optionKey]: payload } : state;
    default:
      return state;
  }
};
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    DashboardReducer,
    initialState
  );
  const memoizedState = useMemo(() => state, [state]);

  return (
    <AppStateContext.Provider value={memoizedState}>
      <AppDispathContext.Provider value={dispatch}>
        {children}
      </AppDispathContext.Provider>
    </AppStateContext.Provider>
  );
};
