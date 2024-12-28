import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useRef } from "react";
import type { ToastMessage } from "primereact/toast";

import { Toast, type ToastRef } from "../ui/_Toast";

const ToastContext = createContext<((options: ToastMessage | ToastMessage[]) => void) | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
    const toastRef = useRef<ToastRef>(null);

    const showToast = useCallback((options: ToastMessage | ToastMessage[]) => {
        if (!toastRef.current) {
            return;
        }
        toastRef.current?.show?.(options);
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            <Toast ref={toastRef} />
            <div>{children}</div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const toast = useContext(ToastContext);

    if (!toast) {
        return;
    }

    return toast;
};
