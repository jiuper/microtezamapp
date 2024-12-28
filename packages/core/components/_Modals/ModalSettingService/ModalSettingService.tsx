import { forwardRef, useImperativeHandle } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/_Modals/Modal";
import { ButtonsAction } from "@/components/ButtonsAction";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import { UploadImage } from "@/view/SettingPage/components/UploadImage";

import styles from "./ModalSettingService.module.scss";

const cx = cnBind.bind(styles);
export const MODAL_SETTING_SERVICE_DEFAULT_VALUES: ModalSettingServiceState = {
    caption: "",
    files: [],
    price: "",
    description: "",
    time: "",
    picture: [],
};

export type ModalSettingServiceModel = ModalSettingServiceState;

export type ModalSettingServiceState = {
    id?: string;
    serviceId?: string;
    files?: File[];
    caption?: string;
    description?: string;
    time?: string;
    price?: string;
    picture?: string[];
};
export type ModalSettingServiceRef = {
    setFormValues: (values: ModalSettingServiceModel) => void;
    clearValues: () => void;
};

interface ModalSettingServiceProps {
    onSubmit: (data: ModalSettingServiceModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalSettingService = forwardRef<ModalSettingServiceRef, ModalSettingServiceProps>(
    ({ onSubmit, onClose, isOpen }, ref) => {
        const formik = useFormik({
            initialValues: MODAL_SETTING_SERVICE_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values });
            },
        });

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...values },
                })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_SETTING_SERVICE_DEFAULT_VALUES },
                })),
        }));

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <UploadImage
                        classNameImage={cx("image")}
                        onChange={(e) => formik.setFieldValue("files", e)}
                    />
                    <div className={cx("block", "container")}>
                        <InputText
                            isFullWidth
                            label="Добавьте название"
                            name="caption"
                            onChange={formik.handleChange}
                            value={formik.values.caption}
                        />
                        <InputTextarea
                            isFullWidth
                            label="Добавьте описание"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        <InputText
                            isFullWidth
                            label="Продолжительность"
                            name="time"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                        />
                        <InputText
                            isFullWidth
                            label="Стоимость"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />
                    </div>
                </form>

                <ButtonsAction
                    isOpen={isOpen}
                    onSubmit={formik.handleSubmit}
                    onClose={onClose}
                    btnLabel={["Сохранить изменения", "Назад к услугам"]}
                />
            </Modal>
        );
    },
);
