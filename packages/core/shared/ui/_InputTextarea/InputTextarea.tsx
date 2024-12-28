import cnBind from "classnames/bind";
import type { InputTextareaProps } from "primereact/inputtextarea";
import { InputTextarea } from "primereact/inputtextarea";

import styles from "./InputTextarea.module.scss";

export interface UIInputTextareaProps extends InputTextareaProps {
    rootClassName?: string;
    label: string;
    error?: string;
    isFullWidth?: boolean;
}

const cx = cnBind.bind(styles);

export const UIInputTextarea = ({
    rootClassName,
    className,
    error,
    label,
    value,
    disabled,
    isFullWidth,
    autoResize = false,
    ...props
}: UIInputTextareaProps) => {
    return (
        <label
            className={cx("textarea", rootClassName, {
                "with-value": value,
                disabled,
                error,
                isFullWidth,
            })}
        >
            <span className={cx("label")}>{label}</span>
            <InputTextarea
                className={cx("textarea-field", className, { error, isFullWidth })}
                value={value}
                disabled={disabled}
                autoResize={autoResize}
                {...props}
            />
            {error && <span className={cx("message")}>{error}</span>}
        </label>
    );
};
