import cnBind from "classnames/bind";
import type { SelectButtonProps } from "primereact/selectbutton";
import { SelectButton } from "primereact/selectbutton";

import styles from "./SelectButton.module.scss";

const cx = cnBind.bind(styles);

export interface UISelectButtonProps extends SelectButtonProps {
    title?: string;
}

export const UISelectButton = ({ title, ...props }: UISelectButtonProps) => {
    return (
        <div className={cx("ui-select-button")}>
            {title && <div className={cx("title")}>{title}</div>}
            <SelectButton className={cx("select-button")} {...props} />
        </div>
    );
};
