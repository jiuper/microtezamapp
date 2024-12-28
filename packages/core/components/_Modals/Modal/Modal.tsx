import { Modal as DialogModal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const handleOpen = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <DialogModal
            style={{
                borderRadius: "44px 44px 0 0",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            className={cx("modal")}
            open={isOpen}
            onOpenChange={(open) => handleOpen(open)}
        >
            {children}
        </DialogModal>
    );
};
