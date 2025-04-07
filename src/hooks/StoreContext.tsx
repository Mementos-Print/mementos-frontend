import { createContext, Dispatch, SetStateAction } from "react";
import { StoreState } from "../types/type";
import * as fabric from "fabric";

export const StoreContext = createContext<{
  store: StoreState;
  setStore: Dispatch<SetStateAction<StoreState>>;
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  AddSelectedImages: (file: File) => void;
  RemoveSelectedImages: (file: File) => void;
  RemoveAllSelectedImages: () => void;
  setBorderColor: (color: 'white' | 'black') => void;
  admin: { name: string, email: string, password: string }[];
  isAdmin: boolean,
  isLoading: boolean,
}>({
  store: {
    user: {},
    selectedToPrint: [],
    importedImages: [],
    border: ''
  },
  setStore: () => {},
  canvasRef: { current: null },
  AddSelectedImages: () => { },
  RemoveSelectedImages: () => { },
  RemoveAllSelectedImages: () => { },
  setBorderColor: () => { },
  admin: [{ name: '', email: '', password: '' }],
  isAdmin: false,
  isLoading: true,
});