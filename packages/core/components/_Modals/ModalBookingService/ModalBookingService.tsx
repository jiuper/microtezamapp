import { Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/_Button";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ModalBookingService.module.scss";

const cx = cnBind.bind(styles);
type ModalBookingServiceProps = {
    isOpen: boolean;
    count?: number;
    price?: number;
    time?: number;
    title?: string;
    onClick?: () => void;
    label?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    currencyShortTitle?: string;
};
export const ModalBookingService = ({
    isOpen,
    count,
    time,
    price,
    title,
    onClick,
    label,
    isLoading,
    isDisabled,
    currencyShortTitle,
}: ModalBookingServiceProps) => {
    return (
        <Modal
            style={{
                borderRadius: "44px 44px 0 0",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            open={isOpen}
            modal={false}
        >
            <div className={cx("modal-booking-service")}>
                <div className={cx("description-order")}>
                    <div className={cx("count-service")}>
                        <span>{count}</span>
                        <SvgIcon className={cx("icon")} name="notebook" />
                    </div>
                    <div className={cx("time-price")}>
                        <span>
                            {time !== 0 && `${time} мин /`} {`${price} ${currencyShortTitle}`}
                        </span>
                    </div>
                </div>
                <Button
                    loading={isLoading}
                    disabled={isDisabled}
                    onClick={onClick}
                    className={cx("button")}
                    label={label}
                />
                <span className={cx("text")}>{title}</span>
            </div>
        </Modal>
    );
};
