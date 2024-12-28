import React from "react";
import cnBind from "classnames/bind";
import type { InputTextProps } from "primereact/inputtext";
import { InputText } from "primereact/inputtext";

import styles from "./InputText.module.scss";

export interface UIInputProps extends InputTextProps {
    rootClassName?: string;
    label?: string;
    error?: string;
    icon?: string | JSX.Element;
    size?: "small" | "medium";
    iconPos?: "start" | "end";
    color?: "orange" | "white";
    isFullWidth?: boolean;
    iconClassName?: string;
    labelClassName?: string;
    onIconClick?: () => void;
}

const cx = cnBind.bind(styles);

export const UIInputText = React.forwardRef<HTMLInputElement, UIInputProps>(
    (
        {
            rootClassName,
            className,
            error,
            label,
            value,
            icon,
            disabled,
            isFullWidth,
            size = "small",
            color = "purple",
            iconPos = "start",
            placeholder,
            iconClassName,
            onIconClick,
            labelClassName,
            ...props
        },
        ref,
    ) => {
        const iconElem = typeof icon === "string" ? <i className={icon} /> : icon;

        return (
            <label
                className={cx("input-text", rootClassName, {
                    "with-value": value !== "",
                    [`icon-${iconPos}`]: icon,
                    color,
                    disabled,
                    error,
                    isFullWidth,
                })}
            >
                {icon && (
                    <span
                        className={cx("icon", iconClassName, {
                            disabled,
                            error,
                            color,
                            [`icon-${iconPos}`]: icon,
                            [`${size}`]: size,
                            [`${color}`]: color,
                        })}
                        onClick={onIconClick}
                    >
                        {iconElem}
                    </span>
                )}
                <span
                    className={cx("label", labelClassName, {
                        [`${size}`]: size,
                        [`${color}`]: color,
                    })}
                >
                    {label}
                </span>
                <InputText
                    className={cx("text-field", className, {
                        [`${size}`]: size,
                        [`${color}`]: color,
                        [`icon-${iconPos}`]: icon,
                        "with-icon": icon,
                        "with-label": label,
                        isFullWidth,
                        error,
                    })}
                    ref={ref}
                    value={value}
                    disabled={disabled}
                    placeholder={label ? undefined : placeholder}
                    {...props}
                />
                {error && <span className={cx("message", { [`${color}`]: color })}>{error}</span>}
            </label>
        );
    },
);
