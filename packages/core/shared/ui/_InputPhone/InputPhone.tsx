import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import cnBind from "classnames/bind";
import countries from "countries-phone-masks";
import parsePhoneNumber from "libphonenumber-js";

import { useBooleanState } from "@/shared/hooks";

import { Dropdown } from "../_Dropdown";
import { InputText, type InputTextProps } from "../_InputText";

import styles from "./InputPhone.module.scss";

const cx = cnBind.bind(styles);

export interface InputPhoneProps extends Omit<InputTextProps, "value" | "onChange"> {
    value?: string;
    onChange?: (value: string, name?: string) => void;
}

type Country = {
    flag: string;
    code: string;
    label: string;
    phoneCode: string;
};

type IpApiRes = {
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_name: string;
    country_code: string;
    country_code_iso3: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
};

const countryOptionTemplate = (option: Country) => {
    return (
        <div className={cx("country-option")}>
            <img src={option.flag} alt={option.code} width={24} height={16} />
            <div>{option.label}</div>
        </div>
    );
};

const selectedOptionTemplate = (option: Country) => {
    return <img src={option?.flag} alt={option?.code} width={24} height={16} />;
};

const countriesOptions = countries
    .filter((el) => el.name === "Russia" || el.name === "Belarus")
    .map((country) => ({
        label: `${country.name} ${country.code}`,
        phoneCode: country.code,
        code: country.iso,
        flag: country.flag,
    }));

export const InputPhone = ({ value, onChange, isFullWidth, label, name, ...props }: InputPhoneProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    const [isOpenDropdown, , , toggleDropdown] = useBooleanState();
    const [dropdownValue, setDropDownValue] = useState<Country>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value.replace(/[^+\d]/g, "");
        onChange?.(val?.split("")?.[0] !== "+" ? `+${val}` : val, name);
    };

    const handleDropdownChange = ({ value: val }: { value: Country }) => {
        const phoneNumber = parsePhoneNumber(value ?? "");

        setDropDownValue(val);

        if (phoneNumber?.nationalNumber) {
            onChange?.(`${val.phoneCode}${phoneNumber.nationalNumber}`);
        } else {
            onChange?.(val.phoneCode);
        }
    };

    const getDefaultvalue = useCallback(async () => {
        const { data } = await axios.get<IpApiRes>("https://ipapi.co/json");
        const v = countriesOptions.find((item) => item.code === data?.country_code) || countriesOptions[0];

        setDropDownValue(v);
        onChange?.(v?.phoneCode, name);
    }, [onChange]);

    useEffect(() => {
        if (!value) {
            void getDefaultvalue().catch(undefined);
        }

        if (value && dropdownValue && value?.length < dropdownValue.phoneCode.length) {
            onChange?.(dropdownValue.phoneCode, name);
        }
    }, [dropdownValue, dropdownValue?.code, dropdownValue?.phoneCode, getDefaultvalue, onChange, value]);

    useEffect(() => {
        const phoneNumber = parsePhoneNumber(value ?? "");

        if (phoneNumber?.country) {
            setDropDownValue(countriesOptions.find((item) => item.code === phoneNumber.country) ?? dropdownValue);
        }
    }, [dropdownValue, value]);

    useEffect(() => {
        if (isOpenDropdown) {
            const width = rootRef.current?.getBoundingClientRect().width;

            const panel = document.querySelector<HTMLDivElement>(`.${cx("panel")}`);
            panel?.style.setProperty("--max-input-phone-dropdown-width", `${width ?? 250}px`);
        }
    }, [isOpenDropdown]);

    return (
        <div className={cx("input-phone", { isFullWidth })} ref={rootRef}>
            <Dropdown
                className={cx("dropdown")}
                panelClassName={cx("panel")}
                options={countriesOptions}
                value={dropdownValue}
                filter
                itemTemplate={countryOptionTemplate}
                valueTemplate={selectedOptionTemplate}
                onChange={handleDropdownChange}
                onHide={toggleDropdown}
                onShow={toggleDropdown}
            />
            <InputText
                className={cx("input-number", { isOpenDropdown, withLabel: label })}
                labelClassName={cx("label")}
                type="tel"
                value={value}
                onChange={handleInputChange}
                isFullWidth={isFullWidth}
                label={label}
                name={name}
                {...props}
            />
        </div>
    );
};
