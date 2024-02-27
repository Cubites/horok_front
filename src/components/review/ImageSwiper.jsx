// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./swiper.css";

// import required modules
import { Pagination } from "swiper/modules";

const ImageSwiper = ({ images }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              key={index}
              src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${image}`}
              className="reviewImg"
              alt="reviewImg"
              width="350"
              height="350"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default ImageSwiper;
