import cnBind from "classnames/bind";
import type { DropdownProps } from "primereact/dropdown";
import { Dropdown } from "primereact/dropdown";

import { useBooleanState } from "@/shared/hooks";

import styles from "./Dropdown.module.scss";

const cx = cnBind.bind(styles);

export interface UIDropdownProps extends DropdownProps {
    label?: string;
    rootClassName?: string;
    icon?: string | JSX.Element;
    error?: string;
    isFullWidth?: boolean;
}

export const UIDropdown = ({
    error,
    className,
    rootClassName,
    icon,
    disabled,
    label,
    value,
    onShow,
    onHide,
    isFullWidth,
    panelClassName,
    ...props
}: UIDropdownProps) => {
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
        <div className={cx("dropdown", rootClassName, { "with-value": value, isFullWidth, error })}>
            {icon && <span className={cx("icon", { disabled, error })}>{iconElem}</span>}
            <span className={cx("label", { isShowMenu, error })}>{label}</span>
            <Dropdown
                className={cx("dropdown-field", className, {
                    isShowMenu,
                    isFullWidth,
                    error,
                    "with-label": label,
                })}
                value={value}
                onShow={handleDropdownShow}
                onHide={handleDropdownHide}
                panelClassName={cx("menu", panelClassName)}
                {...props}
            />
            {error && <span className={cx("message")}>{error}</span>}
        </div>
    );
};
