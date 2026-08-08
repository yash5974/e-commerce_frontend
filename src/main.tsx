import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import QueryProvider from "./app/providers/QueryProvider.tsx";
import { store } from "./app/store.ts";
import "./index.css";
import { Toaster } from "./ui/sonner.tsx";
import { TooltipProvider } from "./ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <TooltipProvider>
          <App />
          <Toaster richColors />
        </TooltipProvider>
      </QueryProvider>
    </Provider>
  </StrictMode>,
);
