import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./assets/fonts/fonts.css";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./store.jsx";
import setupInterceptors from "@/services/setupInterceptors.js";
import { checkSession } from "./slices/auth.js";

const container = document.getElementById("root");
const root = createRoot(container);

setupInterceptors(store);

store.dispatch(checkSession()); // Check user session on load

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
