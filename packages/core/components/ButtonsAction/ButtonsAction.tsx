import { useEffect, useState } from "react";
import { Modal as DialogModal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";

import { Button } from "@/shared/ui/_Button";

import styles from "./ButtonsAction.module.scss";

const cx = cnBind.bind(styles);
type ButtonsActionProps = {
    isOpen: boolean;
    onSubmit?: () => void;
    onClose?: () => void;
    btnLabel?: string[];
    submitBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
    closeBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
};
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

export const ButtonsAction = ({
    btnLabel,
    onSubmit,
    submitBtnParams,
    closeBtnParams,
    onClose,
    isOpen,
}: ButtonsActionProps) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        if (isMobileDevice()) {
            const handleResize = () => {
                const viewport = window.visualViewport;

                if (viewport && viewport.height < window.innerHeight) {
                    setIsKeyboardVisible(true);
                } else {
                    setIsKeyboardVisible(false);
                }
            };

            if (window.visualViewport) {
                window.visualViewport.addEventListener("resize", handleResize);
            } else {
                window.addEventListener("resize", handleResize);
            }

            return () => {
                if (window.visualViewport) {
                    window.visualViewport.removeEventListener("resize", handleResize);
                } else {
                    window.removeEventListener("resize", handleResize);
                }
            };
        }
    }, []);

    if (!isOpen || isKeyboardVisible) {
        return null;
    }

    return (
        <DialogModal
            style={{
                borderRadius: "44px 44px 0 0",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(40px)",
                zIndex: 50,
                position: "fixed",
            }}
            className={cx("modal")}
            open={isOpen}
            modal={false}
            onOpenChange={() => {}}
        >
            <div className={cx("wrapper")}>
                <div className={cx("actions")}>
                    {btnLabel?.[0] !== "" && (
                        <Button
                            className={cx("btn-submit")}
                            onClick={onSubmit}
                            label={btnLabel ? btnLabel[0] : "Принять"}
                            {...submitBtnParams}
                        />
                    )}
                    <Button
                        className={cx("btn-close")}
                        variant="outlined"
                        onClick={onClose}
                        label={btnLabel ? btnLabel[1] : "Закрыть"}
                        {...closeBtnParams}
                    />
                </div>
            </div>
        </DialogModal>
    );
};
