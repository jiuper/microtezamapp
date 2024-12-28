import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";

import styles from "./Button.module.scss";

export type ButtonVariants = "solid" | "outlined" | "text" | "shadow" | "clear";

const cx = cnBind.bind(styles);

export interface UIButtonProps extends ButtonProps {
    variant?: ButtonVariants;
    isFullWidth?: boolean;
}

export const UIButton = ({
    variant = "solid",
    type = "button",
    className,
    isFullWidth,
    ...props
}: UIButtonProps) => {
    return (
        <Button
            type={type}
            className={cx("ui-button", className, variant, { isFullWidth })}
            {...props}
        />
    );
};
