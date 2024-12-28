import React from "react";
import cnBind from "classnames/bind";
import type { ToastProps } from "primereact/toast";
import { Toast } from "primereact/toast";


import styles from "./Toast.module.scss";

export type ToastRef = Toast;

export type UIToastProps = ToastProps;

const cx = cnBind.bind(styles);

export const UIToast = React.forwardRef<ToastRef, UIToastProps>((props, ref) => {

    return <Toast className={cx("toast", "isMobile")} {...props} ref={ref} />;
});
