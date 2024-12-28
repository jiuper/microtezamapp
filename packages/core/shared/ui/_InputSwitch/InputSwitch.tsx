import cnBind from "classnames/bind";
import type { InputSwitchProps } from "primereact/inputswitch";
import { InputSwitch } from "primereact/inputswitch";

import styles from "./InputSwitch.module.scss";

const cx = cnBind.bind(styles);

export interface UIInputSwitchProps extends InputSwitchProps {
    label?: string;
    labelPos?: "start" | "end";
    error?: string;
}

export const UIInputSwitch = ({
    labelPos = "end",
    label,
    disabled,
    error,
    ...props
}: UIInputSwitchProps) => {
    return (
        <label className={cx("ui-input-switch")}>
            {label && labelPos === "start" && (
                <span className={cx("label", { disabled })}>{label}</span>
            )}
            <InputSwitch className={cx("input-switch")} disabled={disabled} {...props} />
            {label && labelPos === "end" && (
                <span className={cx("label", { disabled })}>{label}</span>
            )}
            {error && <span className={cx("message")}>{error}</span>}
        </label>
    );
};
