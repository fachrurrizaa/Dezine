import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay, Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import './swiper-bundle.min.css';
import { useState } from 'react';

export default function Slider ({ images }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, FreeMode, Thumbs]}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                className='mySwiper2'
                >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                    <img src={image} alt={image}/>
                    </SwiperSlide>
                ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >{images.map((image) => (
                    <SwiperSlide key={image}>
                    <img src={image} alt={image}/>
                    </SwiperSlide>
                ))}
                </Swiper>
        </>
    )
}