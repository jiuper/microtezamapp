import { useState } from "react";
import { DayPicker as DayPickerReact, getDefaultClassNames } from "react-day-picker";
import cnBind from "classnames/bind";
import { ru } from "date-fns/locale";
import { DateTime } from "luxon";

import { useBooleanState } from "@/shared/hooks";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick.tsx";

import "react-day-picker/style.css";
import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: DateTime) => void;
    value?: DateTime;
};
export const DayPicker = ({ value, onChange }: DayPickerProps) => {
    const [isOpen, , close, toggle] = useBooleanState(false);
    const ref = useOutsideClick(close);
    const [selected, setSelected] = useState<DateTime>(value || DateTime.now().startOf("day"));
    const onChangeHandler = (date: DateTime) => {
        setSelected(date);
        onChange?.(date);
    };
    const defaultClassNames = getDefaultClassNames();

    return (
        <div className={cx("day-picker")} ref={ref}>
            <span onClick={toggle} className={cx("title")}>
                {selected.setLocale("ru").toFormat("LLLL yyyy")}
            </span>
            <div className={cx("day-picker-modal", isOpen && "open")}>
                <DayPickerReact
                    locale={ru}
                    mode="single"
                    selected={selected?.toJSDate()}
                    onSelect={(date) =>
                        date ? onChangeHandler(DateTime.fromJSDate(date)) : () => {}
                    }
                    className={cx("module")}
                    classNames={{
                        chevron: cx(defaultClassNames.button_next, "button_custom"),
                        caption_label: cx(defaultClassNames.caption_label, "caption_custom"),
                        day_button: cx(defaultClassNames.day_button, "day_button_custom"),
                        weekday: cx(defaultClassNames.weekday, "weekday_custom"),
                    }}
                />
            </div>
        </div>
    );
};
