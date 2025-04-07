import { useState, ReactNode, FC, useEffect, useRef, useMemo } from "react";
import { StoreContext } from "./StoreContext";
import * as fabric from "fabric";
import { AdminProps, StoreState } from "../types/type";

const initialState: StoreState = {
    user: {},
    importedImages: [],
    selectedToPrint: [],
    border: "white",
};

const Admin: AdminProps[] = [
    {
        name: "Admin",
        email: "example@gmail.com",
        password: "admin123",
    },
];

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize the store with state from localStorage for persistence
    const [store, setStore] = useState<StoreState>(() => getLocalStorage("store", initialState));

    const [admin, _setAdmin] = useState<AdminProps[]>(() => getLocalStorage("admin", Admin));
    const [isAdmin, _setIsAdmin] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef<fabric.Canvas | null>(null);

    // // Initialize selected images from localStorage if available
    // useEffect(() => {
    //     const savedImages = localStorage.getItem('store');
    //     if (savedImages) {
    //         setStore(prevState => ({
    //             ...prevState,
    //             selectedToPrint: JSON.parse(savedImages)
    //         }));
    //     }
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Simulate a 1-second delay
        return () => clearTimeout(timer);
    }, []);

    // Update `selectedToPrint` in localStorage whenever it changes
    useEffect(() => {
        if (store.selectedToPrint.length > 0) {
            localStorage.setItem('selectedToPrint', JSON.stringify(store.selectedToPrint));
        } else {
            localStorage.removeItem('selectedToPrint');
        }
    }, [store.selectedToPrint]);

    const AddSelectedImages = (file: File) => {
        setStore(prevStore => {
            const updatedSelection = [...prevStore.selectedToPrint];
            if (!updatedSelection.includes(file)) {
                updatedSelection.push(file);
            }
            return { ...prevStore, selectedToPrint: updatedSelection };
        });
    };

    const RemoveSelectedImages = (file: File) => {
        setStore(prevStore => ({
            ...prevStore,
            selectedToPrint: prevStore.selectedToPrint.filter(item => item !== file),
        }));
    };

    const RemoveAllSelectedImages = () => {
        setStore(prevStore => ({
            ...prevStore,
            selectedToPrint: [],
        }));
    };

    const setBorderColor = (color: 'white' | 'black') => {
        setStore(prevStore => ({
            ...prevStore,
            border: color,
        }));
    };

    // Update store in localStorage whenever the store changes
    useEffect(() => {
        setLocalStorage("store", store);
    }, [store]);

    const contextValue = useMemo(
        () => ({
            store,
            setStore,
            canvasRef,
            AddSelectedImages,
            RemoveSelectedImages,
            RemoveAllSelectedImages,
            setBorderColor,
            admin,
            isAdmin,
            isLoading,
        }),
        [store, admin, isAdmin, isLoading]
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
}

export { StoreProvider };
