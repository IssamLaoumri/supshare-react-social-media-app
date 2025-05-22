import React from "react";
import "./Toast.scss";
import { useToast } from "@/contexts/ToastContext.jsx";
import {Check, Warning, XMark} from "@/svg/index.jsx";

export default function Toast() {
    const { toasts, removeToast } = useToast();

    const getIconByType = (type) => {
        switch (type) {
            case "ERROR":
                return <XMark className="check" />;
            case "WARNING":
                return <Warning className="check" />;
            case "INFO":
                return <Check className="check" />;
            default:
                return <Check className="check" />; // Default icon if type doesn't match
        }
    };

    const handleClose = (id) => {
        removeToast(id);
    };

    return (
        <div className="toasts-container">
            {toasts.map((toast) => (
                <div key={toast.id} className="toast" style={{ borderLeftColor: toast.color }}>
                    <div className="toast-content">
                        <div className="icon" style={{ background: toast.color }}>
                            {getIconByType(toast.type)}
                        </div>
                        <div className="message">
                            <span className="text text-1">{toast.title}</span>
                            <span className="text text-2">{toast.message}</span>
                        </div>
                    </div>
                    <div className="close" onClick={() => handleClose(toast.id)}>
                        <XMark />
                    </div>
                    <div className="progress" style={{ "--toast-color": toast.color }}></div>
                </div>
            ))}
        </div>
    );
}