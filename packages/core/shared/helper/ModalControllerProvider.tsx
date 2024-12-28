import type { ReactElement } from "react";
import { createContext, useContext, useMemo } from "react";

import { useBooleanState } from "../../../apps/bogokoapp/src/shared/hooks";

type IModalContextValue = {
    RecordAddModalIsOpen: boolean;
};
type IModalContextMutate = {
    openRecordAddModal: () => void;
    closeRecordAddModal: () => void;
};
const ModalContextValue = createContext<IModalContextValue | null>(null);
const ModalContextMutate = createContext<IModalContextMutate | null>(null);
export const useModalContextValue = () => {
    const context = useContext(ModalContextValue);

    if (!context) {
        throw new Error("useModalContext must be used within the context");
    }

    return context;
};
export const useModalContextMutate = () => {
    const context = useContext(ModalContextMutate);

    if (!context) {
        throw new Error("useModalContextMutate must be used within the context");
    }

    return context;
};
export const ModalControllerProvider = ({ children }: { children: ReactElement }) => {
    const [RecordAddModalIsOpen, openRecordAddModal, closeRecordAddModal] = useBooleanState(false);

    const modalContextValue: IModalContextValue = useMemo(() => {
        return {
            RecordAddModalIsOpen,
        };
    }, [RecordAddModalIsOpen]);
    const modalContextMutate: IModalContextMutate = useMemo(() => {
        return {
            openRecordAddModal,
            closeRecordAddModal,
        };
    }, [openRecordAddModal, closeRecordAddModal]);

    return (
        <ModalContextValue.Provider value={modalContextValue}>
            <ModalContextMutate.Provider value={modalContextMutate}>
                {children}
            </ModalContextMutate.Provider>
        </ModalContextValue.Provider>
    );
};
