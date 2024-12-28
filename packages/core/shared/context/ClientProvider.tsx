import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { GetCompanyDto } from "../../../apps/bogokoapp/src/entities/company/types.ts";
import type { GetMasterFullInfoDto, MasterServiceInfo } from "../../../apps/bogokoapp/src/entities/masters/types.ts";
import type { ResponseNewRecordDto } from "../../../apps/bogokoapp/src/entities/record/types.ts";
import type { UserData } from "../../../apps/bogokoapp/src/entities/user/types.ts";
import { useAppSelector } from "../../../apps/bogokoapp/src/shared/redux/configStore.ts";

export type BookingData = {
    masterInfo?: GetMasterFullInfoDto;
    workData?: {
        date: string;
        time: string;
    };
};
type IContextClientValue = {
    companyInfo: GetCompanyDto | null;
    listMaster: GetMasterFullInfoDto[];
    userData: UserData | null;
    booking: BookingData[];
    newRecord: ResponseNewRecordDto | null;
};
type IContextClientMutate = {
    handleSetCompanyInfo: (data: GetCompanyDto | null) => void;
    handleSetListMaster: (data: GetMasterFullInfoDto[]) => void;
    handleSetBooking: (data: BookingData) => void;
    handleResetBooking: () => void;
    handleEditBooking: (masterId: string) => void;
    handleRemoveServiceBooking: (serviceId: MasterServiceInfo) => void;
    handleAddMasterBooking: (masterId: string) => void;
    handleAddWorkDateBooking: (date: string, time: string) => void;
    handleGetNewRecord: (data: ResponseNewRecordDto) => void;
};

const ClientContext = createContext<IContextClientValue | null>(null);
const ClientContextMutate = createContext<IContextClientMutate | null>(null);
export const useClientContext = () => {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error("useClientContext must be used within the context");
    }

    return context;
};
export const useClientContextMutate = () => {
    const context = useContext(ClientContextMutate);

    if (!context) {
        throw new Error("useClientContextMutate must be used within the context");
    }

    return context;
};
export const ClientProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const userData = useAppSelector((state) => state.account.userData);
    const [companyInfo, setCompanyInfo] = useState<GetCompanyDto | null>(null);
    const [listMaster, setListMaster] = useState<GetMasterFullInfoDto[]>([]);
    const [booking, setBooking] = useState<BookingData[]>([]);
    const [newRecord, setNewRecord] = useState<ResponseNewRecordDto | null>(null);

    const handleSetCompanyInfo = useCallback((data: GetCompanyDto | null) => {
        setCompanyInfo(data);
    }, []);

    const handleSetListMaster = useCallback((data: GetMasterFullInfoDto[]) => {
        setListMaster(data);
    }, []);

    const handleSetBooking = useCallback(
        (data: BookingData) => {
            if (booking.length) {
                setBooking(booking.map((el) => (el.masterInfo?.id === data.masterInfo?.id ? data : el)));
            } else {
                setBooking([...booking, data]);
            }
        },
        [booking],
    );

    const handleResetBooking = useCallback(() => {
        setBooking([]);
    }, []);

    const handleEditBooking = useCallback((masterId: string) => {
        setBooking((prev) => prev.filter((el) => el.masterInfo?.id !== masterId));
    }, []);

    const handleAddMasterBooking = useCallback(
        (masterId: string) => {
            const master = listMaster.find((el) => el.id === masterId);
            setBooking([{ ...booking[0], masterInfo: { ...master, services: booking[0]?.masterInfo?.services } }]);
        },
        [booking, listMaster],
    );

    const handleAddWorkDateBooking = useCallback((date: string, time: string) => {
        setBooking((prev) => prev.map((el) => ({ ...el, workData: { date, time } })));
    }, []);

    const handleRemoveServiceBooking = useCallback(
        (serviceId: MasterServiceInfo) => {
            if (booking.length) {
                const newBooking = booking.reduce<BookingData[]>((acc, cur) => {
                    const service = cur.masterInfo?.services;

                    if (!service?.length) {
                        return acc;
                    }
                    const cal = service.some((elem) => elem?.id?.toString() === serviceId.id?.toString());

                    if (cal && service?.length === 1) {
                        return acc;
                    }

                    if (!cal) {
                        acc.push({
                            masterInfo: {
                                ...cur.masterInfo,
                                services: [...(cur.masterInfo?.services || []), serviceId],
                            },
                        });

                        return acc;
                    }

                    acc.push({
                        ...cur,
                        masterInfo: {
                            ...cur.masterInfo,
                            services: service.filter((elem) => elem?.id?.toString() !== serviceId.id?.toString()),
                        },
                    });

                    return acc;
                }, []);
                setBooking(newBooking);
            } else {
                setBooking([{ masterInfo: { services: [serviceId] } }]);
            }
        },
        [booking],
    );

    const handleGetNewRecord = useCallback((data: ResponseNewRecordDto) => {
        setNewRecord(data);
    }, []);

    useEffect(() => {
        if (booking.length !== 0) localStorage.setItem("booking", JSON.stringify(booking));
    }, [booking]);

    useEffect(() => {
        const ls = localStorage.getItem("booking");

        if (ls) setBooking(JSON.parse(ls));
    }, []);

    const clientContextValue: IContextClientValue = useMemo(() => {
        return {
            companyInfo,
            userData,
            listMaster,
            booking,
            newRecord,
        };
    }, [companyInfo, userData, listMaster, booking, newRecord]);

    const clientContextMutate: IContextClientMutate = useMemo(() => {
        return {
            handleSetCompanyInfo,
            handleSetListMaster,
            handleEditBooking,
            handleResetBooking,
            handleSetBooking,
            handleRemoveServiceBooking,
            handleAddMasterBooking,
            handleAddWorkDateBooking,
            handleGetNewRecord,
        };
    }, [
        handleEditBooking,
        handleRemoveServiceBooking,
        handleResetBooking,
        handleSetBooking,
        handleSetCompanyInfo,
        handleSetListMaster,
        handleAddMasterBooking,
        handleAddWorkDateBooking,
        handleGetNewRecord,
    ]);

    return (
        <ClientContext.Provider value={clientContextValue}>
            <ClientContextMutate.Provider value={clientContextMutate}>{children}</ClientContextMutate.Provider>
        </ClientContext.Provider>
    );
};
