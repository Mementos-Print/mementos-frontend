import { useContext } from "react";
import { AppStateContext } from "../context/AppContext";

export const useAppState =()=>{
    const context = useContext(AppStateContext);
    if(!context)
        throw new Error("useAppState must be within a AppProvider");
    return context;
}