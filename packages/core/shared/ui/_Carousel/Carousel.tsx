import { useEffect, useState } from "react";
import cnBind from "classnames/bind";
import type SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./Carousel.module.scss";

const cx = cnBind.bind(styles);

type UICarouselProps = {
    value: any[];
    classNameImage?: string;
    template?: (product: any) => JSX.Element;
    loop?: boolean;
    pagination?: boolean;
    numVisible?: number;
    className?: string;
};

export const Carousel = ({
    value,
    className,
    classNameImage,
    template,
    loop = false,
    numVisible = 1,
    pagination = true,
}: UICarouselProps) => {
    const listImage = value;
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
        swiperInstance?.slideTo(index);
    };

    const handleSwiper = (swiper: SwiperCore) => {
        setSwiperInstance(swiper);
    };

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.on("slideChange", () => {
                setActiveIndex(swiperInstance.realIndex);
            });
        }
    }, [swiperInstance]);

    return (
        <div className={cx("carousel", className)}>
            <Swiper
                onSwiper={handleSwiper}
                slidesPerView={numVisible}
                spaceBetween={0}
                loop={loop}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {listImage.map((item, i) => (
                    <SwiperSlide key={i}>
                        {template ? (
                            template(item)
                        ) : (
                            <img
                                className={cx("image-company", classNameImage)}
                                src={item as string}
                                alt="image-company"
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {pagination && listImage.length > 1 && (
                <div className={cx("swiper-pagination")}>
                    {listImage.map((_, index) => (
                        <span
                            key={index}
                            className={cx(
                                "swiper-pagination-bullet",
                                activeIndex === index && "active",
                            )}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
