import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/_Modals/Modal";
import { Button } from "@/shared/ui/_Button";
import { ButtonIcon } from "@/shared/ui/_ButtonIcon";
import { Select } from "@/shared/ui/_Select";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { dateFormat } from "@/view/RecordPage/components/RecordView";

import styles from "./ModalAddRecordMaster.module.scss";

const cx = cnBind.bind(styles);
type ModalAddRecordMasterProps = {
    isOpen: boolean;
    onClose: () => void;
    dateTime: string;
};
export const ModalAddRecordMaster = ({
    isOpen,
    onClose,
    dateTime = "2024-09-24 10:30",
}: ModalAddRecordMasterProps) => {
    const formik = useFormik({
        initialValues: {
            service: "Выберите услугу",
            client: "Выберите клиента",
            time: "8:00",
        },
        onSubmit: (values) => {
            console.log("Form data", values);
        },
    });

    const hours = Array.from({ length: 24 }, (_, i) => ({ value: `${i}:00`, title: `${i}:00` }));

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <div className={cx("date")}>{dateFormat(dateTime, 0)}</div>

                        <div className={cx("time")}>
                            <span>{formik.values.time}</span>
                        </div>
                    </div>

                    <div className={cx("body")}>
                        <Select
                            options={[
                                { value: "Консультация1", title: "Консультация1" },
                                { value: "Консультация2", title: "Консультация2" },
                            ]}
                            onChange={(e) => formik.setFieldValue("service", e.value)}
                            name="service"
                            id="service"
                            value={formik.values.service}
                            label="Услуги"
                            className={cx("select")}
                        />
                        <Select
                            options={[
                                { value: "Консультация1", title: "Консультация1" },
                                { value: "Консультация2", title: "Консультация2" },
                            ]}
                            name="client"
                            id="client"
                            onChange={(e) => formik.setFieldValue("client", e.value)}
                            value={formik.values.client}
                            label="Клиент"
                            className={cx("select")}
                        />

                        <Select
                            options={hours}
                            name="time"
                            id="time"
                            icon={false}
                            onChange={(e) => formik.setFieldValue("time", e.value)}
                            value={formik.values.time}
                            label="Время"
                            className={cx("select")}
                        />
                        <ButtonIcon
                            onClick={() => {}}
                            color="empty"
                            className={cx("button")}
                            icon={<SvgIcon name="add-master" />}
                            label="Добавить клиента"
                        />
                    </div>

                    <div className={cx("main")}>
                        <Button label="Сохранить" className={cx("btn")} onClick={() => {}} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
