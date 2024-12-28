import { FileInput, Rating } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/_Modals/Modal";
import type { MasterServiceInfo } from "@/entities/masters/types.ts";
import notFound from "@/shared/assets/images/Empty-image-icon.png";
import { Button } from "@/shared/ui/_Button";
import { UIInputText } from "@/shared/ui/_InputText/InputText.tsx";
import { SignupSchema } from "@/shared/utils/validation.ts";

import { CardOrder } from "../../view/OrderPage/components/OrderView/components/CardOrder";

import styles from "./ModalFeedBack.module.scss";

const cx = cnBind.bind(styles);

type ModalFeedBackProps = {
    isOpen: boolean;
    onClose: () => void;
    service?: MasterServiceInfo;
    currencyShortTitle?: string;
    onSubmit?: () => void;
};
export const ModalFeedBack = ({
    isOpen,
    onClose,
    service,
    currencyShortTitle,
    onSubmit,
}: ModalFeedBackProps) => {
    const formik = useFormik({
        initialValues: {
            rating: 0,
            file: "",
            comment: "",
        },
        validationSchema: SignupSchema,
        onSubmit: () => {
            onSubmit?.();
            formik.resetForm();
        },
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("title")}>Отзыв об услуге</div>
                <form onSubmit={formik.handleSubmit} className={cx("content")}>
                    <div className={cx("card")}>
                        <div className={cx("header")}>
                            <CardOrder
                                avatar={service?.image || notFound}
                                name={service?.name}
                                post={`${service?.time} мин`}
                                price={`${service?.priceMax} ${currencyShortTitle}`}
                            />
                            <Rating
                                value={formik.values.rating}
                                onChange={(e) => formik.setFieldValue("rating", e)}
                                precision={0.5}
                            />
                        </div>
                        <div className={cx("body")}>
                            <div className={cx("file")}>
                                <span className={cx("title")}>Фото и видео</span>
                                <FileInput
                                    name="file"
                                    value={formik.values.file}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx("comment")}>
                                <span className={cx("title")}>Что вы хотите улучшить?</span>
                                <UIInputText
                                    label="Поделитесь своими впечатлениями"
                                    value={formik.values.comment}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="comment"
                                    onBlur={formik.handleBlur}
                                    isFullWidth
                                />
                            </div>
                        </div>
                        <div className={cx("footer")}>
                            <Button label="Оставить отзыв" type="submit" />
                            <Button variant="outlined" label="Закрыть" onClick={onClose} />
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
