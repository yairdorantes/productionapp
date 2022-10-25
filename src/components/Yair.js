import React from "react";
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper";

const Yair = ({ video, shorts, idVideo, videoTime }) => {
  const swiper = useSwiper();

  return (
    <>
      {/* <Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1}>
        <SwiperSlide>
          <div>1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>2</div>
        </SwiperSlide>
      </Swiper> */}
      <button onClick={() => console.log(video)}>testing</button>
    </>
  );
};

export default Yair;
