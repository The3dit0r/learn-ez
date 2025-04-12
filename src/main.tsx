import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./helper.css";
import "./keyframes.css";
import "./!important.css";

import App from "./App.tsx";

import { SnackbarProvider } from "@context/snackbar/index.tsx";
import { UserDataProvider } from "@context/user/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>
);
