import { useState, ReactNode, FC, useEffect, useContext } from "react";
import { StoreContext } from "./StoreContext";

var initialState = {
    user: {},
    files: []
  };

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const [store, setStore] = useState<StoreContextType>({});
    const [store, setStore] = useState(() => getLocalStorage("store", initialState));

    function setLocalStorage(key:string, value: any) {
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

    return <StoreContext.Provider value={{ store, setStore }}>
        {children}
    </StoreContext.Provider>;
};

export { StoreProvider };