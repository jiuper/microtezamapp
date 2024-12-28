import { useState } from "react";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import { Calendar } from "@/components/Calendar";
import { DayPicker } from "@/components/DayPicker";
import type { GetMasterDto } from "@/entities/masters/types";
import { Carousel } from "@/shared/ui/_Carousel";
import { Select } from "@/shared/ui/_Select";
import type { filterDate } from "@/view/CalendarPage/components/CalendarView";

import styles from "./Journal.module.scss";

const cx = cnBind.bind(styles);

type JournalProps = {
    filterViewWeek?: filterDate[];
    filterViewDate?: filterDate;
    onChaneFilter?: (date: filterDate) => void;
    onChange?: (date: Date) => void;
    listMaster?: GetMasterDto[];
    mode?: boolean;
    dateTrue?: string[];
};

export const Journal = ({
    onChange,
    filterViewWeek,
    filterViewDate,
    onChaneFilter,
    listMaster,
    mode = false,
    dateTrue,
}: JournalProps) => {
    const [id, setId] = useState<string>(listMaster?.[0].id?.toString() || "");
    const [selected, setSelected] = useState<DateTime>(DateTime.now().startOf("day"));
    const filterMaster = listMaster?.find((item) => item.id === id);
    const onChangeHandler = (date: DateTime) => {
        setSelected(date);
        onChange?.(date.toJSDate());
    };

    return (
        <div className={cx("journal")}>
            <div className={cx("header")}>
                <DayPicker onChange={onChangeHandler} value={selected} />
                <Select
                    className={cx("select")}
                    options={filterViewWeek || []}
                    onChange={(e: filterDate) => onChaneFilter?.(e)}
                    value={filterViewDate?.title}
                />
            </div>
            {mode && listMaster && (
                <div className={cx("master-wrapper")}>
                    <div className={cx("list-masters")}>
                        <Carousel
                            template={(item: GetMasterDto) => (
                                <div
                                    onClick={() => setId(id === item.id ? "" : item.id)}
                                    className={cx("profile")}
                                >
                                    <div className={cx("image-wrapper")}>
                                        <img
                                            className={cx("image", id === item.id && "active")}
                                            src={item.image}
                                            alt={`Profile of ${item.name}`}
                                        />
                                    </div>
                                    <span className={cx("name", id === item.id && "active")}>
                                        {item.name}
                                    </span>
                                </div>
                            )}
                            value={listMaster}
                            numVisible={5}
                            className={cx("carousel-master")}
                            loop={false}
                            pagination={false}
                        />
                    </div>
                    <span className={cx("title")}>Записи мастера {filterMaster?.name}</span>
                </div>
            )}
            <div className={cx("list")}>
                <div className={cx("avatar")}>
                    {id && <Avatar size={40} src={filterMaster?.image} />}
                </div>

                <Calendar
                    value={selected}
                    onChange={onChange}
                    filterViewDate={filterViewDate}
                    isHeader={false}
                    dateTrue={dateTrue}
                />
            </div>
        </div>
    );
};
