import { useState } from "react";
import type { SelectProps } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import type { SelectItem } from "primereact/selectitem";

import { useOutsideClick } from "@/shared/hooks/useOutsideClick.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./Select.module.scss";

const cx = cnBind.bind(styles);
export interface UISelectProps extends Omit<SelectProps, "children" | "onChange"> {
    label?: string;
    rootClassName?: string;
    icon?: boolean;
    error?: string;
    isFullWidth?: boolean;
    options: SelectItem[];
    onChange?: (value: any) => void;
}
export const Select = ({
    value,
    options,
    label,
    error,
    rootClassName,
    icon = true,
    isFullWidth,
    onChange,
    className,
}: UISelectProps) => {
    const [isShowMenu, show] = useState(false);

    const handleDropdownShow = () => show(!isShowMenu);
    const ref = useOutsideClick(() => show(false));

    return (
        <div
            onClick={handleDropdownShow}
            className={cx("dropdown", { rootClassName, isFullWidth, error, isShowMenu }, className)}
        >
            {label && <span className={cx("label", { isShowMenu, error })}>{label}</span>}
            <div ref={ref} className={cx("select")}>
                <span className={cx("title", { isShowMenu, error })}>{value}</span>
                <div className={cx("options", { isShowMenu })}>
                    {options.map((option, index) => (
                        <span
                            onClick={() => onChange?.(option as any)}
                            className={cx("option")}
                            key={index}
                        >
                            {option.title}
                        </span>
                    ))}
                </div>
                {icon && <SvgIcon name="ArrowDown" className={cx("icon", { isShowMenu })} />}
            </div>
        </div>
    );
};
