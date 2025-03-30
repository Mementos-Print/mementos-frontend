import { createContext, Dispatch, SetStateAction } from "react";
import { StoreState } from "../types/type";
import * as fabric from "fabric";

export const StoreContext = createContext<{
  store: StoreState;
  setStore: Dispatch<SetStateAction<StoreState>>;
  borderColor: string;
  setBorderColor: Dispatch<SetStateAction<"white" | "black">>;
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  selectedToPrint: File[];
  setSelectedToPrint: Dispatch<SetStateAction<File[]>>;
  AddSelectedImages: (file: File) => void;
  RemoveSelectedImages: (file: File) => void;
  RemoveAllSelectedImages: () => void;
  admin: {username: string, email: string, password: string}[];
  isAuthenticated: boolean, 
  isAdmin: boolean, 
  isLoading: boolean,
  login: (email: string, password: string) => void, 
  logout: () => void,
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
  admin: [{username: '', email: '', password: ''}],
  isAuthenticated: false,
  isAdmin: false, 
  isLoading: true,
  login: () => {}, 
  logout: () => {},
});