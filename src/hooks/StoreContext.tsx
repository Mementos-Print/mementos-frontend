import { createContext, Dispatch, SetStateAction } from "react";
import { StoreState } from "../types/type";
import * as fabric from "fabric";
import { LoginRequest, LoginResponse } from "../types/auth";

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
  user: LoginResponse | null
  error: string | null
  isAuthenticated: boolean, 
  isAdmin: boolean, 
  isLoading: boolean,
  login: (credential: LoginRequest) => void, 
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
  user: {
    token: "",
    user: {
        id: "",
        email: "",
        name: "",
        role: "",
    }
  },
  error: "",
  isAuthenticated: false,
  isAdmin: false, 
  isLoading: true,
  login: () => {}, 
  logout: () => {},
});