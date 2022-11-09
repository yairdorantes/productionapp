import "./styles/shortStyles.css";
import { InView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import left from "../media/left-arrow.png";
import right from "../media/right-arrow.png";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import MenuBar from "./MenuBar";

let url = "https://englishapputc.herokuapp.com/api/shortsetV2/";
let manageScore = "https://englishapputc.herokuapp.com/api/shortsV2/";
const ShortsV2 = () => {
  let { user } = useContext(AuthContext);
  let getUserUrl = `https://englishapputc.herokuapp.com/api/users/${user.user_id}`;
  const [show, setShow] = useState(false);
  const [shortId, setShortId] = useState();
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerSelected, setAnswerSelected] = useState();
  const [disabledBtnSendAnswer, setDisabledBtnSendAnswer] = useState(true);
  const [currentVideo, setCurrentVideo] = useState();
  const [shorts, setShorts] = useState([]);
  const [videoIsEnd, setVideoIsEnd] = useState(false);
  const [btnTranscription, setBtnTranscription] = useState(false);
  const [correct, setCorrect] = useState(false);
  // const [stop, setStop] = useState(true);
  const [answerAlreadySent, setAnswerAlreadySent] = useState(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [userScore, setUserScore] = useState();

  const fetchAPi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setShorts(responseJSON);
    const getUserFetch = await fetch(getUserUrl);
    const receiveUser = await getUserFetch.json();
    setUserScore(receiveUser.user.score);
    console.log(responseJSON);
  };
  useEffect(() => {
    fetchAPi();
    // document.addEventListener("keydown", clicked, true);
  }, []);
  // const clicked = (e) => {
  //   if (e.key === " ") {
  //     // console.log(currentVideo);
  //     // currentVideo && currentVideo.pause();
  //   }
  // };

  const handleText = () => {
    show ? setShow(false) : setShow(true);
  };
  const handleChangeRadio = (e) => {
    setAnswerSelected(parseInt(e.target.value));
  };
  useEffect(() => {
    answerSelected === correctAnswer ? setCorrect(true) : setCorrect(false);
  }, [answerSelected]);

  const getValue = () => {
    setBtnTranscription(false);

    setAnswerAlreadySent(true);

    // if (answerSelected == correctAnswer) {
    //   setCorrect(true);
    // } else {
    //   setCorrect(false);
    // }

    let options = {
      body: {
        id: shortId,
        user_id: user.user_id,
        is_correct: correct,
      },
      headers: { "content-type": "application/json" },
    };

    console.log(options);
    // console.log(correct);

    helpHttp()
      .post(manageScore, options)
      .then((res) => {
        console.log(res);
        res.subio === true && setUserScore(userScore + 10);
        res.subio === false && setUserScore(userScore - 5);
      });
  };

  const advance = () => {
    // const video = document.querySelector("video");
    currentVideo.currentTime = currentVideo.currentTime + 2;
  };
  const goBack = () => {
    currentVideo.currentTime = currentVideo.currentTime - 2;
  };
  const PlayBtn = () => {
    currentVideo.paused ? currentVideo.play() : currentVideo.pause();
  };

  return (
    <>
      <Swiper
        keyboard={true}
        mousewheel={true}
        style={{ height: "100vh" }}
        className="swiper-shorts"
        slidesPerView={1}
        spaceBetween={30}
        modules={[Pagination, Mousewheel, Keyboard]}
        // cssMode={true}
        // pagination={true}
        direction={"vertical"}
        // noSwiping={true}
        // noSwipingClass={"swiper-slide"}
        // allowTouchMove={false}
        // pagination={{ clickable: true }}
      >
        {!shorts ? (
          <Loader></Loader>
        ) : (
          shorts.map((short) => {
            return (
              <SwiperSlide className="swiper-slide-short" key={short.id}>
                <InView
                  os="div"
                  onChange={(inView, entry) => {
                    var video = entry.target.querySelector("video");

                    if (inView) {
                      setShortId(short.id);
                      setCurrentVideo(video);

                      video.play();
                      // .catch((e) => {
                      //   console.log(e);
                      // });

                      short.answers.map((answer) => {
                        // console.log(answer);
                        answer.is_correct === true &&
                          setCorrectAnswer(answer.id);
                      });

                      video.onended = function (e) {
                        // console.log("termino");
                        setVideoIsEnd(true);
                        console.log(e);
                        setBtnTranscription(true);
                        setShow(false);
                        setDisabledBtnSendAnswer(false);
                        //
                        //
                      };
                    } else {
                      video.pause();
                      setAlreadyAnswered(false);

                      setShow(false);
                      //setCorrectAnswer(0);
                      // setAnswerSelected();
                      setDisabledBtnSendAnswer(true);

                      setVideoIsEnd(false);
                      setBtnTranscription(false);
                      //  setCorrect();
                      setAnswerAlreadySent(false);
                    }
                  }}
                >
                  <div className="container-short">
                    <video
                      onClick={PlayBtn}
                      src={short.short_url}
                      controls
                      // loop
                    ></video>
                    <div>
                      <button
                        disabled={btnTranscription ? true : false}
                        onClick={handleText}
                        className="btn-transcription"
                      >
                        {show
                          ? "Ocultar trasncripcion"
                          : "Mostrar trasncripcion"}
                      </button>
                      <div className="container-arrows-video">
                        <button
                          // style={{ marginRight: "10px" }}
                          className="btn-control-video"
                          onClick={goBack}
                        >
                          <img style={{ width: "25px" }} src={left} alt="" />
                        </button>
                        <button className="btn-control-video" onClick={advance}>
                          <img style={{ width: "25px" }} src={right} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="container-question-answer">
                      <h3
                        className={
                          videoIsEnd
                            ? "container-question"
                            : "container-question hidden"
                        }
                      >
                        {short.question}
                      </h3>

                      <br />
                      <div>
                        <div
                          className={
                            videoIsEnd
                              ? "container-answers"
                              : "container-answers hidden"
                          }
                        >
                          {short.answers.map((answer, i) => {
                            return (
                              <label
                                key={answer.id}
                                className="block-radio"
                                htmlFor={answer.id}
                              >
                                <input
                                  className="input-radio"
                                  onChange={handleChangeRadio}
                                  type="radio"
                                  id={answer.id}
                                  name="radio_answet"
                                  value={answer.id}
                                  //  checked={answerSelected[answer.id] || false}
                                />
                                {answer.answer_text}
                              </label>
                            );
                          })}
                          <div
                            className={
                              videoIsEnd
                                ? "container-btn-send-answer"
                                : "container-btn-send-answer hidden"
                            }
                          >
                            <button
                              disabled={disabledBtnSendAnswer}
                              className={
                                answerAlreadySent
                                  ? "hide-btn-send"
                                  : "send-answer"
                              }
                              onClick={getValue}
                            >
                              Enviar
                            </button>
                            <div
                              className={
                                answerAlreadySent
                                  ? correct
                                    ? "answer-sent is-correct"
                                    : "answer-sent is-wrong"
                                  : "hide-mgs-answer"
                              }
                            >
                              {answerAlreadySent && correct
                                ? "¡Correcto!"
                                : "¡Incorrecto!"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container-text-short">
                        <div>
                          <p
                            className={
                              show
                                ? `transcription-short`
                                : "transcription-short hidden"
                            }
                          >
                            {short.translation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* </Modal> */}
                  </div>
                </InView>
              </SwiperSlide>
            );
          })
        )}
        <div className="score-user-show-short">Puntuación: {userScore}</div>
      </Swiper>
      <MenuBar></MenuBar>
    </>
  );
};

export default ShortsV2;
