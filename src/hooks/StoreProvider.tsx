import { useState, ReactNode, FC, useEffect, useRef, useMemo } from "react";
import { StoreContext } from "./StoreContext";
import * as fabric from "fabric";
import { AdminProps, StoreState } from "../types/type";

const initialState: StoreState = {
    user: {},
    files: []
};

const Admin: AdminProps[] = [
    {
        username: "Admin",
        email: "example@gmail.com",
        password: "admin123",
    },
];


const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<StoreState>(() => getLocalStorage("store", initialState));

    const [admin, _setAdmin] = useState<AdminProps[]>(() => getLocalStorage("admin", Admin));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedToPrint, setSelectedToPrint] = useState<File[]>([])

    const [borderColor, setBorderColor] = useState<'white' | 'black'>('white')
    const canvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after some time
        }, 1000); // Simulate a 1-second delay
        return () => clearTimeout(timer);
    }, []);

    const login = (username: string, password: string) => {
        const foundAdmin = admin.find(
            (a) => a.username === username && a.password === password
        );
        if (foundAdmin) {
            setIsAuthenticated(true);
            setIsAdmin(true);
        } else {
            console.error("Invalid admin credentials");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    const AddSelectedImages = (file: File) => {
        setSelectedToPrint(prevSelection => {
            const updatedSelection = [...prevSelection];
            if (!Object.values(selectedToPrint).includes(file)) {
                updatedSelection.push(file);
            }
            // console.log(selectedToPrint);

            return updatedSelection;
        });
    }

    const RemoveSelectedImages = (file: File) => {
        setSelectedToPrint(selectedToPrint => selectedToPrint.filter((item) => item !== file));
    }

    const RemoveAllSelectedImages = () => {
        setSelectedToPrint([]);
    }

    useEffect(() => {
        setLocalStorage("store", store);
    }, [store]);

    const contextValue = useMemo(
        () => ({
            store,
            setStore,
            borderColor,
            setBorderColor,
            canvasRef,
            selectedToPrint,
            setSelectedToPrint,
            AddSelectedImages,
            RemoveSelectedImages,
            RemoveAllSelectedImages,
            admin,
            isAuthenticated,
            isAdmin,
            isLoading,
            login,
            logout,
        }),
        [store, borderColor, selectedToPrint, admin, isAuthenticated, isAdmin, isLoading]
    );

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

function setLocalStorage(key: string, value: any) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("Failed to save to local storage:", e);
    }
}

function getLocalStorage<T>(key: string, initialValue: T): T {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    } catch (e) {
        return initialValue;
    }
}7
export { StoreProvider };