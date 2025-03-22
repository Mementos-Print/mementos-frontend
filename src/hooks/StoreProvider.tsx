import { useState, ReactNode, FC, useEffect, useRef } from "react";
import { StoreContext } from "./StoreContext";
import * as fabric from "fabric";

const initialState = {
    user: {},
    files: []
};

const Admin = [
    {
        username: "Admin",
        email: "example@gmail.com",
        password: "admin123", 
    },
];


const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [store, setStore] = useState(() => getLocalStorage("store", initialState));
    const [admin, _setAdmin] = useState(() => getLocalStorage("admin", Admin));

    const [selectedToPrint, setSelectedToPrint] = useState<File[]>([])

    const [borderColor, setBorderColor] = useState<'white' | 'black'>('white')
    const canvasRef = useRef<fabric.Canvas | null>(null);

    function setLocalStorage(key: string, value: any) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // catch possible errors:
            // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        }
    }

    function getLocalStorage(key: string, initialValue: any) {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
            // if error, return initial value
            return initialValue;
        }
    }

    useEffect(() => {
        setLocalStorage("store", store);
    }, [store]);

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


    return <StoreContext.Provider
        value={{ 
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
        }}
    >
        {children}
    </StoreContext.Provider>;
};

export { StoreProvider };