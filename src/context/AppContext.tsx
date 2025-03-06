
import {
    createContext,
    ReactNode,
    useReducer,
    Reducer,
    useContext,
  } from "react";
import { headers } from "../constants";
  interface State {
    activePolaroidBase: string;
    onUpload: string
  }
  interface Action {
    type: string;
    payload?: string;
  }
  type Dispatch = (action: Action) => void;
  interface AppProviderProps {
    children: ReactNode;
  }
  const initialState = { activePolaroidBase: headers[0]?.name, onUpload: "" };
  const AppStateContext = createContext<State | undefined>(undefined);
  const AppDispathContext = createContext<Dispatch | undefined>(undefined);
  const DashboardReducer = (state: State, action: Action) => {
    const { type,payload } = action;
    switch (type) {
      case "SET_POLAROID_BASE":
        return { ...state, activePolaroidBase: payload || headers[0]?.name };
      case "SET_UPLOAD":
        return {...state, onUpload: payload || ""}
      default:
        return state; 
    }
  };
  export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
      DashboardReducer,
      initialState
    );
    return (
      <AppStateContext.Provider value={state}>
        <AppDispathContext.Provider value={dispatch}>
          {children}
        </AppDispathContext.Provider>
      </AppStateContext.Provider>
    );  
  };
  export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context)
      throw new Error("useAppState must be used within a AppProvider");
    return context;
  };
  export const useAppDispatch = () => {
    const context = useContext(AppDispathContext);
    if (!context)
      throw new Error("useAppDispatch must be used within a AppProvider");
    return context;
  };
  