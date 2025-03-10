
import {
    createContext,
    ReactNode,
    useReducer,
    Reducer,
  } from "react";
import { headers } from "../constants";
import { images } from "../components/polaroid/dummy";
  interface State {
    activePolaroidBase: string;
    onUpload: string;
    selectedImages: string[];
    importedImages: string[];
  }
  interface Action {
    type: string;
    payload?: string;
    payload2?: string[];
  }
  type Dispatch = (action: Action) => void;
  interface AppProviderProps {
    children: ReactNode;
  }
  const initialState = { activePolaroidBase: headers[0]?.name, onUpload: "",selectedImages: [], importedImages: images};
  export const AppStateContext = createContext<State | undefined>(undefined);
  export const AppDispathContext = createContext<Dispatch | undefined>(undefined);
  const DashboardReducer = (state: State, action: Action) => {
    const { type,payload,payload2 } = action;
    switch (type) {
      case "SET_POLAROID_BASE":
        return { ...state, activePolaroidBase: payload || headers[0]?.name };
      case "SET_UPLOAD":
        return {...state, onUpload: payload || ""}
      case "SET_SELECTED": 
        return {...state, selectedImages: payload2 || []}
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
