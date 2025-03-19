import { useAppDispatch } from "./useAppDispatch";
import { State } from "../context/AppContext";

export const useSetSelected = () => {
  const dispatch = useAppDispatch();
  return <T extends string[] | number[]>(optionKey: keyof State, value: T) => {
    dispatch({ type: "SET_SELECTED", optionKey, payload2: value });
  };
};
