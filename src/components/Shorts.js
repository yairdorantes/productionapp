import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { InView } from "react-intersection-observer";
import heart from "../media/heart.png";
import "swiper/css";
import { Pagination, Mousewheel } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Yair from "./Yair";

const Shorts = () => {
  const [shorts, setShorts] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const [swiper, setSwiper] = useState();

  ///const [isplay, setIsplay] = useState(true);

  const fetchAPi = async () => {
    const urlShorts = "https://englishapputc.herokuapp.com/api/shortset/";
    const params = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const response = await fetch(urlShorts, params);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setShorts(responseJSON);
  };

  useEffect(() => {
    fetchAPi();
  }, []);
  useEffect(() => {
    console.log(document.getElementById("10"));
  }, [currentVideo]);

  const handlePlay = (e) => {
    let video = e.target;
    // console.log(video);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      <Swiper
        mousewheel={true}
        className="swiper-shorts"
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Mousewheel]}
        spaceBetween={100}
        slidesPerView={1}
      >
        {!shorts ? (
          <Loader></Loader>
        ) : (
          shorts.map((short, key) => {
            return (
              <SwiperSlide key={key}>
                <InView
                  as="div"
                  onChange={(inView, entry) => {
                    // console.log(inView);
                    var video = entry.target.querySelector("video");

                    if (inView) {
                      setCurrentVideo(video);
                      let idVideo = video.id;
                      video.play().catch((e) => {
                        console.log(e);
                      });
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <div className="shorts-container">
                    <div className="short-video">
                      <video
                        id={short.id - 1}
                        // inView={inView}
                        //  muted={false}
                        onClick={handlePlay}
                        loop
                        src={short.short_url}
                        // autoPlay
                      ></video>
                    </div>
                  </div>
                </InView>

                <Swiper
                  id={key + 10}
                  data-id={key}
                  modules={[Pagination]}
                  spaceBetween={10}
                  slidesPerView={1}
                  onSwiper={(swiper) => setSwiper(swiper)}
                >
                  {/*in every swiperslide data-swiper-autoplay="2000"*/}
                  {short.sub_card_list.map((subCard, index) => {
                    // console.log(subCard);
                    return (
                      <SwiperSlide
                        className="swiper-slide-subtitles"
                        key={subCard.id}
                        // data-swiper-autoplay="1000"
                      >
                        <InView
                          onChange={(inView, entry2) => {
                            if (inView) {
                              let video =
                                entry2.target.parentElement.parentElement.parentElement.parentElement.querySelector(
                                  "video"
                                );

                              let specificSecond = subCard.skip_to;

                              video.currentTime = specificSecond;

                              // swiper && console.log(swiper);
                            }
                          }}
                        >
                          <div className="short-info">
                            <p className="sentence-short">{subCard.sentence}</p>
                            <p className="sentence-meaning-short">
                              {subCard.meaning}
                            </p>
                          </div>
                        </InView>
                        {/* <Yair></Yair> */}

                        {swiper && (
                          <button onClick={() => swiper.slideTo(1)}>
                            {/* jaja {SwiperTest()} */}
                          </button>
                        )}

                        {/* <Yair video={currentVideo} swiper={swiper}></Yair> */}

                        {/* <button onClick={swiper.slideTo(1)}>xd</button> */}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <div className="container-likes-short">
                  <button className="btn-like-short">
                    <img src={heart} alt="likes" />
                    <div className="num-likes-short">{short.likes}</div>
                  </button>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </>
  );
};

export default Shorts;
