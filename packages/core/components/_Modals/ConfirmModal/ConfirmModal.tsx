import { useState } from "react";
import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/_Button";

import styles from "./ConfirmModal.module.scss";

const cx = cnBind.bind(styles);

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    message?: string;
    btnLabel?: string[];
    submitBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
    closeBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
};
export const ConfirmModal = ({
    onClose,
    isOpen,
    message,
    onSubmit,
    submitBtnParams,
    closeBtnParams,
    btnLabel,
}: ConfirmModalProps) => {
    return (
        <Dialog
            className={cx("modal")}
            visible={isOpen}
            onHide={onClose}
            header={message && <div className={cx("content")}>{message}</div>}
        >
            <div className={cx("wrapper")}>
                <div className={cx("actions")}>
                    <Button
                        className={cx("btn-submit")}
                        onClick={onSubmit}
                        label={btnLabel ? btnLabel[0] : "Принять"}
                        {...submitBtnParams}
                    />
                    <Button
                        className={cx("btn-close")}
                        variant="outlined"
                        onClick={onClose}
                        label={btnLabel ? btnLabel[1] : "Закрыть"}
                        {...closeBtnParams}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export type UseConfirmModalTempData = {
    message?: string;
    btnLabel?: string[];
    onSubmit: () => void;
    onClose: () => void;
};
export const useConfirmModal = () => {
    const [isOpen, open, close] = useBooleanState(false);

    const [tempData, setTempData] = useState<UseConfirmModalTempData>({
        message: "",
        btnLabel: [],
        onSubmit: () => undefined,
        onClose: () => undefined,
    });

    const withConfirm = (params: UseConfirmModalTempData) => {
        setTempData(params);
        open();
    };

    const modalProps = {
        isOpen,
        message: tempData.message,
        btnLabel: tempData.btnLabel,
        onClose: () => {
            close();
            tempData.onClose();
        },
        onSubmit: () => {
            close();
            tempData.onSubmit();
        },
    };

    return { withConfirm, modalProps };
};
