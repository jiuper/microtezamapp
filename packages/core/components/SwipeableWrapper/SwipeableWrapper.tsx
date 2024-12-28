import type { ReactNode } from "react";
import type { SwipeableHandlers, SwipeableProps } from "react-swipeable";
import { useSwipeable } from "react-swipeable";
import cnBind from "classnames/bind";

import styles from "./SwipeableWrapper.module.scss";

const cx = cnBind.bind(styles);
interface SwipeableWrapperProps extends SwipeableProps {
    children: ReactNode;
    className?: string;
    position?: number;
}

export const SwipeableWrapper = ({
    children,
    className,
    position,
    onSwiped,
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwipedDown,
    ...rest
}: SwipeableWrapperProps) => {
    const handlers: SwipeableHandlers = useSwipeable({
        onSwiped,
        onSwipedLeft,
        onSwipedRight,
        onSwipedUp,
        onSwipedDown,
        trackMouse: true,
        ...rest,
    });

    return (
        <div
            className={cx("swiper", className)}
            style={{ transform: `translateX(${position}px)` }}
            {...handlers}
        >
            {children}
        </div>
    );
};
