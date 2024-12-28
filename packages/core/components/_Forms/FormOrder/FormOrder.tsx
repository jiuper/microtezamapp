import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import type { GetMasterFullInfoDto, MasterServiceInfo } from "packages/apps/bogokoapp/src/entities/masters/types.ts";
import { useOrderCreateMutation } from "packages/apps/bogokoapp/src/entities/order/api/createOrderMasterApi";
import type { RequestRecordDto } from "packages/apps/bogokoapp/src/entities/order/types.ts";
import type { ResponseNewRecordDto } from "packages/apps/bogokoapp/src/entities/record/types.ts";
import { ROUTES } from "packages/apps/bogokoapp/src/shared/const/Routes.ts";
import type { BookingData } from "@/shared/context/ClientProvider.tsx";
import { useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { Button } from "@/shared/ui/_Button";
import { InputPhone } from "@/shared/ui/_InputPhone";
import { UIInputText } from "@/shared/ui/_InputText/InputText.tsx";
import { UIInputTextarea } from "@/shared/ui/_InputTextarea/InputTextarea.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { SignupSchema } from "@/shared/utils/validation.ts";

import styles from "./FormOrder.module.scss";

const cx = cnBind.bind(styles);
type FormOrderProps = {
    booking: BookingData[];
    masterInfo?: GetMasterFullInfoDto;
    handleResetBooking: () => void;
};
export const FormOrder = ({ booking, handleResetBooking, masterInfo }: FormOrderProps) => {
    const href = useNavigate();
    const { handleGetNewRecord } = useClientContextMutate();
    const { mutate: createOrder, isPending } = useOrderCreateMutation();
    const onSubmit = () => {
        const createOrderParams = booking.reduce<RequestRecordDto[]>((acc, el) => {
            acc.push({
                firstName: formik.values.firstName,
                phone: formik.values.phone.replace("+", " "),
                comment: formik.values.comment,
                recordInfo:
                    {
                        ...masterInfo,
                        services: el.masterInfo?.services,
                        totalTimePriceInfo: {
                            totalDuration: el.masterInfo?.services?.reduce(
                                (acc, cur) => acc + (cur.time || 0),
                                0,
                            ),
                            totalPriceMin: el.masterInfo?.services?.reduce(
                                (acc, cur) => acc + (cur.priceMin || 0),
                                0,
                            ),
                            totalPriceMax: el.masterInfo?.services?.reduce(
                                (acc, cur) => acc + (cur.priceMax || 0),
                                0,
                            ),
                        },
                    } || {},
                time: `${el.workData?.date} ${el.workData?.time || ""}` || "",
                masters: [
                    {
                        masterId: el?.masterInfo?.id || "",
                        serviceId:
                            el?.masterInfo?.services?.map((elem) => String(elem.id) || "") || [],
                    },
                ],
            });

            return acc;
        }, []);

        const onSuccess = (data: ResponseNewRecordDto) => {
            href(ROUTES.RECORD);
            handleResetBooking();
            handleGetNewRecord(data);
            void formik.setValues({ firstName: "", phone: "", comment: "" });
        };
        createOrder(createOrderParams[0], { onSuccess: (data) => onSuccess(data) });
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            phone: "",
            comment: "",
        },
        validationSchema: SignupSchema,
        onSubmit: () => {
            onSubmit();
            formik.resetForm();
        },
    });
    const listData = booking.reduce<MasterServiceInfo[]>((acc, el) => {
        acc.push(...(el.masterInfo?.services || []));

        return acc;
    }, []);
    const price = listData.reduce((acc, el) => acc + (el.priceMax || 0), 0);
    const time = listData.reduce((acc, el) => acc + (el.time || 0), 0);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={cx("form", "form-wrapper")}>
                <div className={cx("item")}>
                    <UIInputText
                        label="Ваше имя*"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        type="text"
                        name="firstName"
                        onBlur={formik.handleBlur}
                        isFullWidth
                        error={
                            formik.errors.firstName && formik.touched.firstName
                                ? formik.errors.firstName
                                : undefined
                        }
                    />
                </div>

                <div className={cx("item")}>
                    <InputPhone
                        label="Телефон*"
                        value={formik.values.phone}
                        onChange={(e) => formik.setFieldValue("phone", e)}
                        onBlur={formik.handleBlur}
                        name="phone"
                        isFullWidth
                        error={
                            formik.errors.phone && formik.touched.phone
                                ? formik.errors.phone
                                : undefined
                        }
                    />
                </div>
                <div className={cx("item")}>
                    <UIInputTextarea
                        label="Комментарии"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        name="comment"
                        isFullWidth
                    />
                </div>
            </div>

            <div className={cx("modal-booking-service", "form-wrapper")}>
                <div className={cx("description-order")}>
                    <div className={cx("count-service")}>
                        <span>{listData.length}</span>
                        <SvgIcon className={cx("icon")} name="notebook" />
                    </div>
                    <div className={cx("time-price")}>
                        <span>
                            {`${time} мин`} / {`${price} руб`}
                        </span>
                    </div>
                </div>
                <Button
                    loading={isPending}
                    disabled={!!formik.errors.phone}
                    onClick={onSubmit}
                    className={cx("button")}
                    label={formik.errors.phone ? "Укажите телефон" : "Подтвердить запись"}
                />
                <span className={cx("text")}>Даю согласие на обработку персональных данных</span>
            </div>
        </form>
    );
};
