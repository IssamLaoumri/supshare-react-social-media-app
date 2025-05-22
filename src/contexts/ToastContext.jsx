import React, { createContext, useState, useContext, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (type, message, duration = 6000) => {
            const id = Math.random().toString(36).substr(2, 9);
            type = type.toUpperCase();
            let color;
            let title;
            switch (type.toUpperCase()) {
                case "ERROR":
                    color = "#ff3333";
                    title = "Error";
                    break;
                case "WARNING":
                    color = "#FFB700";
                    title = "Warning";
                    break;
                case "INFO":
                    color = "#4070f4";
                    title = "Info";
                    break;
                default:
                    break;
            }
            const newToast = { id, title, message, color, type };

            setToasts((prevToasts) => [...prevToasts, newToast]);

            setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        [removeToast]
    );

    return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);

/*HOW TO USE THIS !!!!
import { useToast } from "../../contexts/ToastContext";
	const { addToast } = useToast();
  EXAMPLE:
<button onClick={() => addToast("error", "Your change has been changed")}>Show Toast</button>

*/