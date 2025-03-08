import { useContext } from "react";
import { AppDispathContext } from "../context/AppContext";

export const useAppDispatch = () => {
  const context = useContext(AppDispathContext);
  if (!context)
    throw new Error("useAppDispatch must be used within a AppProvider");
  return context;
};
