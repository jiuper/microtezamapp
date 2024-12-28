import cnBind from "classnames/bind";
import type { CheckboxProps } from "primereact/checkbox";
import { Checkbox } from "primereact/checkbox";

import styles from "./Checkbox.module.scss";

const cx = cnBind.bind(styles);

export interface UICheckboxProps extends CheckboxProps {
    label?: string;
    labelPos?: "start" | "end";
    error?: string;
}

export const UICheckbox = ({ label, labelPos = "end", className, disabled, error, ...props }: UICheckboxProps) => {
    return (
        <label className={cx("ui-checkbox", className)}>
            {label && labelPos === "start" && <span className={cx("label", { disabled })}>{label}</span>}
            <Checkbox className={cx("checkbox")} disabled={disabled} {...props} />
            {label && labelPos === "end" && <span className={cx("label", { disabled })}>{label}</span>}
            {error && <span className={cx("message")}>{error}</span>}
        </label>
    );
};
