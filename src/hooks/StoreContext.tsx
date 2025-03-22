import { createContext, Dispatch, SetStateAction } from "react";
import { StoreContextType } from "../types/type";
import * as fabric from "fabric";

export const StoreContext = createContext<{
  store: StoreContextType;
  setStore: Dispatch<SetStateAction<StoreContextType>>;
  borderColor: string;
  setBorderColor: Dispatch<SetStateAction<"white" | "black">>;
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  selectedToPrint: File[];
  setSelectedToPrint: Dispatch<SetStateAction<File[]>>;
  AddSelectedImages: (file: File) => void;
  RemoveSelectedImages: (file: File) => void;
  RemoveAllSelectedImages: () => void;
  admin: {username: string, email: string, password: string}[];
}>({
  store: {
    user: {},
    files: []
  },
  setStore: () => { },
  borderColor: '',
  setBorderColor: () => { },
  canvasRef: { current: null },
  selectedToPrint: [],
  setSelectedToPrint: () => {},
  AddSelectedImages: () => {},
  RemoveSelectedImages: () => {},
  RemoveAllSelectedImages: () => {},
  admin: [{username: '', email: '', password: ''}]
});