import { useAppDispatch } from "./useAppDispatch"
import { State } from "../context/AppContext";

export const useSetSelected = ()=>{
    const dispatch = useAppDispatch();
    return (optionKey: keyof State, value: string[] )=>{
        dispatch({type: "SET_SELECTED", optionKey, payload2: value})
    }
}