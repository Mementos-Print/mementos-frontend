import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { StoreProvider } from './hooks/StoreProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
      </AppProvider>
  </StrictMode>,
);
