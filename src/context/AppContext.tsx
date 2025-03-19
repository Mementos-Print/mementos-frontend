import { createContext, ReactNode, useReducer, Reducer, useMemo } from "react";
import { headers } from "../constants";
export interface State {
  activePolaroidBase: string;
  selectedImages: string[];
  importedImages: string[];
  borderOption: string;
  visibleRange: number[];
}
interface Action {
  type: string;
  optionKey?: keyof State;
  payload?: string;
  payload2?: string[] | number[];
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
  visibleRange: [0,1]
};
export const AppStateContext = createContext<State | undefined>(undefined);
export const AppDispathContext = createContext<Dispatch | undefined>(undefined);
const DashboardReducer = (state: State, action: Action) => {
  const { type, payload, payload2, optionKey } = action;
  switch (type) {
    case "SET_OPTION":
      return optionKey ? { ...state, [optionKey]: payload || "" } : state;
    case "SET_UPLOAD":
    case "SET_SELECTED":
      return optionKey ? { ...state, [optionKey]: payload2 || [] } : state;
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
