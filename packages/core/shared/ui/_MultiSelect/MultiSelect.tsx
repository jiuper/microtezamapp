import cnBind from "classnames/bind";
import type { MultiSelectProps } from "primereact/multiselect";
import { MultiSelect } from "primereact/multiselect";

import { useBooleanState } from "@/shared/hooks";

import styles from "./MultiSelect.module.scss";

const cx = cnBind.bind(styles);

export interface UIMultiSelectProps extends MultiSelectProps {
    label?: string;
    rootClassName?: string;
    icon?: string | JSX.Element;
    error?: string;
    isFullWidth?: boolean;
}

export const UIMultiSelect = ({
    label,
    rootClassName,
    className,
    icon,
    panelClassName,
    error,
    isFullWidth,
    onHide,
    onShow,
    disabled,
    ...props
}: UIMultiSelectProps) => {
    const [isShowMenu, show, hide] = useBooleanState(false);
    const iconElem = typeof icon === "string" ? <i className={icon} /> : icon;

    const handleDropdownShow = () => {
        show();
        onShow?.();
    };

    const handleDropdownHide = () => {
        hide();
        onHide?.();
    };

    return (
        <div
            className={cx("multi-select", rootClassName, {
                "with-value": Boolean(props.value) && Array.isArray(props.value) && props.value.length,
                isFullWidth,
                error,
            })}
        >
            {icon && <span className={cx("icon", { disabled, error })}>{iconElem}</span>}
            <span className={cx("label", { isShowMenu, error })}>{label}</span>
            <MultiSelect
                className={cx("multi-select-field", className, { isShowMenu, isFullWidth, error, "with-label": label })}
                onShow={handleDropdownShow}
                onHide={handleDropdownHide}
                panelClassName={cx("menu", panelClassName)}
                {...props}
            />
            {error && <span className={cx("message")}>{error}</span>}
        </div>
    );
};
