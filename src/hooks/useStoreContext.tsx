import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
      throw new Error('useStoreContext must be used within a StoreProvider');
    }
    return context;
  };

export default useStoreContext