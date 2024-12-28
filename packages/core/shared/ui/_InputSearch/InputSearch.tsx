import { useEffect, useState } from "react";
import cnBind from "classnames/bind";
import { InputText, type InputTextProps } from "primereact/inputtext";

import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

import styles from "./InputSearch.module.scss";

const cx = cnBind.bind(styles);

export interface InputSearchProps extends Omit<InputTextProps, "onChange"> {
    rootClassName?: string;
    isFullWidth?: boolean;
    debounceDelay?: number;
    onChange?: (value?: string) => void;
}

export const InputSearch = ({
    rootClassName,
    className,
    isFullWidth,
    disabled,
    placeholder,
    debounceDelay = 0,
    onChange,
    value,
    ...props
}: InputSearchProps) => {
    const [inputValue, setInputValue] = useState<string | undefined | null>(value);

    const debounceValue = useDebouncedValue(inputValue, debounceDelay);

    useEffect(() => {
        if(debounceValue || debounceValue === "")
        onChange?.(debounceValue);
    }, [debounceValue, onChange]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <label className={cx("input-search", rootClassName, isFullWidth)}>
            <InputText
                className={cx("input-text", className, isFullWidth)}
                disabled={disabled}
                placeholder={placeholder || "Поиск"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                {...props}
            />
        </label>
    );
};
