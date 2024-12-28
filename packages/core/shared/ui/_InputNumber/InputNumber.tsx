import React from "react";
import cnBind from "classnames/bind";
import type { InputNumberProps } from "primereact/inputnumber";
import { InputNumber } from "primereact/inputnumber";

import styles from "./InputNumber.module.scss";

const cx = cnBind.bind(styles);

export interface UIInputNumberProps extends Omit<InputNumberProps, "size"> {
    rootClassName?: string;
    label?: string;
    error?: string;
    icon?: string | JSX.Element;
    size?: "small" | "medium";
    iconPos?: "start" | "end";
    color?: "purple" | "white";
    isFullWidth?: boolean;
    iconClassName?: string;
    labelClassName?: string;
    onIconClick?: () => void;
}

export const UIInputNumber = React.forwardRef<HTMLInputElement, UIInputNumberProps>(
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
            maxFractionDigits,
            useGrouping,
            ...props
        },
        ref,
    ) => {
        const iconElem = typeof icon === "string" ? <i className={icon} /> : icon;

        const validValue = typeof value === "number" ? value : undefined;

        return (
            <label
                className={cx("input-number", rootClassName, {
                    "with-value": typeof validValue === "number" || typeof validValue === "string",
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
                <span className={cx("label", labelClassName, { [`${size}`]: size, [`${color}`]: color })}>{label}</span>
                <InputNumber
                    inputClassName={cx("number-field", className, {
                        [`${size}`]: size,
                        [`${color}`]: color,
                        [`icon-${iconPos}`]: icon,
                        "with-icon": icon,
                        "with-label": label,
                        isFullWidth,
                        error,
                    })}
                    decrementButtonClassName={cx("calc-button")}
                    incrementButtonClassName={cx("calc-button")}
                    inputRef={ref}
                    value={validValue}
                    disabled={disabled}
                    maxFractionDigits={maxFractionDigits || 2}
                    useGrouping={useGrouping || false}
                    placeholder={label ? undefined : placeholder}
                    {...props}
                />
                {error && <span className={cx("message", { [`${color}`]: color })}>{error}</span>}
            </label>
        );
    },
);
