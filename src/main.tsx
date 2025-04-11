import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./helper.css";
import "./keyframes.css";
import "./!important.css";

import App from "./App.tsx";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./models/utils/firebase.env.ts";
// Powered by Sorry for using Firebase...
initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
