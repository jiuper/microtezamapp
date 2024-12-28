import { Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import tg from "@/shared/assets/icon/Avatar.svg";
import inst from "@/shared/assets/icon/Group 21.svg";
import tiktok from "@/shared/assets/icon/tik.svg";
import { ButtonIconArrow } from "@/shared/ui/ButtonIcon";

import styles from "./ModalSocialNetworks.module.scss";

const cx = cnBind.bind(styles);

type ModalSocialNetworksProps = {
    isOpen: boolean;
    onClose: () => void;
    listHrefNetworks: string[];
};
export const ModalSocialNetworks = ({
    isOpen,
    onClose,
    listHrefNetworks,
}: ModalSocialNetworksProps) => {
    const listNetworks = [
        { icon: tg, name: "Телеграм", label: "Написать" },
        { icon: inst, name: "Инстаграм", label: "Посетить" },
        { icon: tiktok, name: "Тикток", label: "Посетить" },
    ];
    const handleOpen = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <Modal
            style={{
                borderRadius: "44px 44px 0 0",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            open={isOpen}
            onOpenChange={(open) => handleOpen(open)}
        >
            <div className={cx("modal-social-networks")}>
                <span className={cx("title")}>Социальные сети</span>
                <div className={cx("networks-list")}>
                    {listNetworks.map((el, i) => (
                        <ButtonIconArrow
                            color="empty"
                            key={i}
                            path={listHrefNetworks[i]}
                            label={el.name}
                            icon={el.icon}
                            text={el.label}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};
