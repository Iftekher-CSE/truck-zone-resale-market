import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React from "react";
import banner1 from "../../../Assets/banner- (1).jpg";
import banner2 from "../../../Assets/55.jpg";
import banner3 from "../../../Assets/33.jpg";
import banner4 from "../../../Assets/66.png";
import { Autoplay, Navigation, Pagination } from "swiper";

const Banner = () => {
    return (
        <div>
            <div>
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper rounded-lg"
                >
                    <SwiperSlide>
                        <img src={banner1} className="w-full" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner2} className="w-full" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner3} className="w-full" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner4} className="w-full" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
