import { useAppDispatch } from "./useAppDispatch";
import { State } from "../context/AppContext";

export const useSetSelected = () => {
  const dispatch = useAppDispatch();
  return <T extends State[keyof State]>(optionKey: keyof State, value: T) => {
    dispatch({ type: "SET_SELECTED", optionKey, payload: value });
  };
};
