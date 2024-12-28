import cnBind from "classnames/bind";

import svgPath from "@/shared/assets/icon/sprite.svg";

import type { SvgIconPropTypes } from "./SvgIcon.type";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);
export const SvgIcon = ({
    width = 24,
    height = 24,
    name,
    className,
    onClick,
}: SvgIconPropTypes) => {
    return (
        <svg className={cx(className)} width={width} onClick={onClick} height={height}>
            <use xlinkHref={`${svgPath}#${name}`} />
        </svg>
    );
};
