import { useState } from "react";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import { DayPicker } from "@/components/DayPicker";
import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import type { filterDate } from "@/view/CalendarPage/components/CalendarView";
import { useDateHandler } from "@/view/CalendarPage/useDateHandler.ts";

import styles from "./Calendar.module.scss";

const cx = cnBind.bind(styles);
type CalendarProps = {
    dateTrue?: string[];
    onChange?: (date: Date) => void;
    value?: DateTime;
    filterViewDate?: filterDate;
    isHeader?: boolean;
};

export const Calendar = ({
    dateTrue,
    onChange,
    filterViewDate = { value: 7, type: "weeks", title: "Неделя" },
    isHeader = true,
    value,
}: CalendarProps) => {
    const [selected, setSelected] = useState<DateTime>(DateTime.now().startOf("day"));
    const onChangeHandler = (date: DateTime) => {
        setSelected(date);
        onChange?.(date.toJSDate());
    };

    const { onChangeDate, date, days, selectedDate, formatListDate, onSelectHandler } =
        useDateHandler(
            filterViewDate?.type,
            filterViewDate?.value,
            dateTrue,
            onChange,
            value || selected,
        );

    return (
        <div className={cx("calendar")}>
            {isHeader && <DayPicker onChange={onChangeHandler} value={selected} />}
            <SwipeableWrapper
                onSwipedLeft={() => onChangeDate()}
                onSwipedRight={() => onChangeDate(true)}
                className={cx("content")}
            >
                {date.map((day, index) => {
                    const initDay = day.date.toLocaleDateString();
                    const today = new Date().toLocaleDateString();
                    const numberDay = new Date(day.date).getDate();
                    const selectedDay = initDay === selectedDate?.toLocaleDateString();

                    const isWeekend =
                        new Date(day.date).getDay() === 0 || new Date(day.date).getDay() === 6;
                    const isWorkDay = formatListDate.includes(initDay);
                    const isToday = initDay === today;

                    return (
                        <div className={cx("days")} key={initDay}>
                            {days.map((_, i) =>
                                i === index ? (
                                    <div
                                        key={initDay}
                                        className={cx("day", {
                                            work: isWorkDay,
                                            notWork: !isWorkDay,
                                            today: isToday,
                                            weekend: isWeekend,
                                            selectedDay,
                                        })}
                                        onClick={() => onSelectHandler(day.date)}
                                    >
                                        <span className={cx("day-week")}>{day.dayOfWeek}</span>
                                        <span className={cx("day-number")}>{numberDay}</span>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    );
                })}
            </SwipeableWrapper>
        </div>
    );
};
