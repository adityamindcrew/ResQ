import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
);
