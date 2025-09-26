"use client"

import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast"

const ToastContext = createContext();

const BRAND_COLOR = "#13101A"

const TOAST_STYLE = {
    common: {
        background: BRAND_COLOR,
        color: "white",
        padding: "16px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    processing: {
        borderLeft: "4px solid #facc15",
    },
    approve: {
        borderLeft: "4px solid #22c55e",
    },
    complete: {
        borderLeft: "4px solid #22c55e",
    },
    reject: {
        borderLeft: "4px solid #ef4444",
    },
    failed: {
        borderLeft: "4px solid #f97316",
    },
    info: {
        borderLeft: "4px solid #2ed3c0",
    }
}

export const ToastProvider = ({ children }) => { // Fixed: children (not Children)
    const showProcessing = (message) => {
        return toast.loading(message, {
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.processing,
            }
        })
    }

    const showApprove = (message) => {
        return toast.success(message, {
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.approve,
            },
            duration: 5000,
        })
    }

    const showComplete = (message) => {
        return toast.success(message, {
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.complete,
            },
            icon: "✅",
            duration: 5000,
        })
    }

    const showReject = (message) => {
        return toast.error(message, {
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.reject,
            },
            icon: "❌",
            duration: 5000,
        })
    }

    const showFailed = (message) => {
        return toast.error(message, {
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.failed,
            },
            icon: "⚠️",
            duration: 5000,
        })
    }

    const showInfo = (message) => {
        return toast(message, { // Fixed: toast.error → toast
            style: {
                ...TOAST_STYLE.common,
                ...TOAST_STYLE.info, // Fixed: failed → info
            },
            duration: 4000,
        })
    }

    const updateToast = (id, state, message) => {
        toast.dismiss(id);

        switch (state) {
            case "processing":
                return showProcessing(message);
            case "approve":
                return showApprove(message);
            case "complete":
                return showComplete(message);
            case "reject":
                return showReject(message);
            case "failed":
                return showFailed(message); // Fixed: showReject → showFailed
            case "info":
            default:
                return showInfo(message);
        }
    };

    const notify = {
        start: (message = "Processing transaction....") => {
            return showProcessing(message);
        },
        update: (id, state, message) => {
            return updateToast(id, state, message);
        },
        approve: (id, message = "Transaction Approved!") => {
            return updateToast(id, "approve", message);
        },
        complete: (id, message = "Transaction completed successfully!") => {
            return updateToast(id, "complete", message);
        },
        reject: (id, message = "Transaction rejected!") => {
            return updateToast(id, "reject", message);
        },
        fail: (id, message = "Transaction failed!") => { // Fixed: duplicate reject → fail
            return updateToast(id, "failed", message);
        },
    };

    const contextValue = {
        notify, // Added notify to context
        showProcessing,
        showApprove,
        showComplete,
        showReject,
        showFailed,
        showInfo,
        updateToast, // Added updateToast to context
    };

    return (
        <ToastContext.Provider value={contextValue}>
            <Toaster 
                position='bottom-right'
                toastOptions={{
                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "white",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "white",
                        },
                    },
                }}
            />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
};