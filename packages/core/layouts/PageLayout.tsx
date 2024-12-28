import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { FixedLayout, Spinner, Tabbar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalAddRecordMaster } from "@/_Modals/ModalAddRecordMaster";
import { useInfoCompanyQuery } from "packages/apps/bogokoapp/src/entities/company/api/getInfoCompanyApi";
import { useAllMastersQuery } from "packages/apps/bogokoapp/src/entities/masters/api/getAllMastersApi";
import { useMasterQuery } from "packages/apps/bogokoapp/src/entities/masters/api/getMasterApi";
import { useAllServicesQuery } from "packages/apps/bogokoapp/src/entities/services/api/getAllServicesApi";
import { ROUTES } from "packages/apps/bogokoapp/src/shared/const/Routes.ts";
import { permissionsPage } from "packages/apps/bogokoapp/src/shared/const/routing.ts";
import { useClientContextMutate } from "packages/apps/bogokoapp/src/shared/context/ClientProvider.tsx";
import { useModalContextMutate, useModalContextValue } from "packages/apps/bogokoapp/src/shared/helper";
import { useNavigationItems } from "packages/apps/bogokoapp/src/shared/hooks/useNavigationItems.ts";
import { useAppSelector } from "packages/apps/bogokoapp/src/shared/redux/configStore.ts";
import { SvgIcon } from "packages/apps/bogokoapp/src/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.account.userData);
    const { RecordAddModalIsOpen } = useModalContextValue();
    const { openRecordAddModal, closeRecordAddModal } = useModalContextMutate();

    const { data: companyData } = useInfoCompanyQuery();
    const { data: mastersData } = useAllMastersQuery(true);
    const { data: servicesData } = useAllServicesQuery();

    const mastersList = useMemo(() => mastersData || [], [mastersData]);
    const mastersFullInfo = useMasterQuery(mastersList.map((master) => master.id));
    const navigationItems = useNavigationItems();
    const location = useLocation().pathname;
    const { handleSetCompanyInfo, handleSetListMaster, handleResetBooking } =
        useClientContextMutate();

    useEffect(() => {
        if (companyData) {
            handleSetCompanyInfo(companyData);
        }

        if (mastersFullInfo) {
            handleSetListMaster(mastersFullInfo);
        }
    }, [companyData, handleSetCompanyInfo, handleSetListMaster, mastersFullInfo]);

    return (
        <>
            {companyData && mastersData && servicesData ? (
                <div className={cx("main-container")}>
                    <main
                        className={cx("main", {
                            "main-with-tabbar": permissionsPage.includes(location),
                        })}
                    >
                        {children}
                    </main>
                    {location === ROUTES.CALENDAR && user?.role !== 50 && (
                        <FixedLayout style={{ bottom: 100, zIndex: 999 }}>
                            <div onClick={openRecordAddModal} className={cx("btn-add")}>
                                <SvgIcon name="Add" />
                            </div>
                        </FixedLayout>
                    )}

                    {permissionsPage.includes(location) && (
                        <FixedLayout style={{ zIndex: 999 }} vertical="top">
                            <Tabbar style={{ height: "80px", zIndex: 999 }}>
                                {navigationItems.map(({ id, label, Icon, link }) => (
                                    <Tabbar.Item
                                        className={cx("tab", { "tab-active": location === link })}
                                        key={id}
                                        text={label}
                                        selected={location === link}
                                        onClick={() => {
                                            navigate(link);
                                            handleResetBooking();
                                        }}
                                    >
                                        <SvgIcon
                                            className={cx({
                                                "tab-icon-active": location === link,
                                                "tab-icon": location !== link,
                                            })}
                                            name={Icon}
                                        />
                                    </Tabbar.Item>
                                ))}
                            </Tabbar>
                        </FixedLayout>
                    )}
                </div>
            ) : (
                <div className={cx("loader")}>
                    <Spinner size="l" />
                </div>
            )}
            <ModalAddRecordMaster
                dateTime="2022-01-01"
                isOpen={RecordAddModalIsOpen}
                onClose={closeRecordAddModal}
            />
        </>
    );
};
