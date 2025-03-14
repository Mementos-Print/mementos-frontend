import { useAppDispatch } from "./useAppDispatch"
import { State } from "../context/AppContext";

export const useSetOption = ()=>{
    const dispatch = useAppDispatch();
    return (optionKey: keyof State, value: string )=>{
        dispatch({type: "SET_OPTION", optionKey, payload: value})
    }
}