import { useNavigate } from "react-router";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { Button } from "primereact/button";

import styles from "./ButtonIconArrow.module.scss";

const cx = cnBind.bind(styles);
export type ButtonIconArrowProps = {
    icon: string;
    label: string;
    text: string;
    onClick?: () => void;
    path?: string;
    color?: "empty" | "white";
};

export const ButtonIconArrow = ({
    icon,
    label,
    onClick,
    path,
    color = "white",
    text,
}: ButtonIconArrowProps) => {
    const href = useNavigate();

    return (
        <div className={cx("button-arrow", color)}>
            <div className={cx("wrapper-button")}>
                <Avatar size={40} className={cx("icon")} src={icon} alt={label} />
                <span>{label}</span>
            </div>
            <Button
                className={cx("button")}
                onClick={path ? () => href(path) : onClick}
                label={text}
            />
        </div>
    );
};
