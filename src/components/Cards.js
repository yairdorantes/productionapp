import React, { useContext, useEffect, useState } from "react";
import "./styles/cardStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles/stylesCards.css";
import { Pagination, EffectCards, Mousewheel, Keyboard } from "swiper";
import wordSound from "../media/cards/audio.png";
import iconAdd from "../media/add.png";
import Loader from "./Loader";
// import CardTuto from "./CardTuto";
import MenuBar from "./MenuBar";
import { NavLink, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import FormCard from "./FormCard";
import PayPal from "./PayPal";
import { helpHttp } from "../helpers/helpHttp";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import next from "../media/next3.png";
import { useSpeechSynthesis } from "react-speech-kit";
import mySite from "./Domain";
import { isMobile } from "react-device-detect";
let url = "";
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const Cards = () => {
  let { user } = useContext(AuthContext);
  // console.log(user.user_id);
  let urlIncreaseScore = `${mySite}increase/${user.user_id}`;

  const paramsUrl = useParams();
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [cardLength, setCardLength] = useState(0);
  const [cards, setCards] = useState([]);
  const [answerSelected, setAnswerSelected] = useState();
  const [cardPicked, setCardPicked] = useState();
  const [modalQuestion, setModalQuestion] = useState(false);
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [mode, setMode] = useState(true);
  const [checked, setChecked] = useState();

  const customStyles = {
    content: {
      // color: "black",
      width: isMobile ? "84vw" : "320px",
      height: "390px",
      backgroundColor: mode ? "white" : "black",
      top: isMobile ? "50%" : "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "solid 1px #270969",
      // backgroundColor: "#00000000",
      outline: "none",
      transition: "1s ease-in-out",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Mulish, sans-serif",

      // padding: "0",
    },
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.9)" },
  };
  const params = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const fetchAPi = async () => {
    // console.log("fetched");
    paramsUrl.section === "mis-cartas"
      ? (url = `${mySite}usercards/${user.user_id}`)
      : (url = `${mySite}cards/${paramsUrl.section}`);
    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setCards(responseJSON);
    console.log(responseJSON);
    setCardLength(responseJSON.cards.length);
    // console.log(responseJSON.cards.length);
  };

  const getUserData = () => {
    helpHttp()
      .get(`${mySite}users/${user.user_id}`)
      .then((res) => {
        // console.log(res.user.premium);
        setIsPremium(res.user.premium);
      });
  };

  useEffect(() => {
    fetchAPi();
    getUserData();
    // console.log(setCards);
  }, []);

  const handleDisplay = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);
  };
  const hideQuestion = () => {
    setModalQuestion(false);
    setResult();
    setIsSent(false);
  };

  const openModal = (e) => {
    // e.preventDefault();
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  function differentRandom() {
    var randoms = [];
    while (randoms.length < 3) {
      var r = Math.floor(Math.random() * cardLength - 1) + 1;
      if (randoms.indexOf(r) === -1) randoms.push(r);
    }
    return randoms;
  }

  const generateQuestion = () => {
    setChecked(-1);

    const lista = [];
    const cartas = cards.cards;
    if (cards.cards) {
      if (cartas.length < 4) {
        hideQuestion();
        alert("Necesitas agregar almenos 4 cartas para generar un Quiz");
      } else {
        const randomsGenerated = differentRandom();
        const cardChoosen = cartas[randomsGenerated[0]];
        lista.push(cardChoosen);
        setCardPicked(cardChoosen);
        const answerOne = cartas[randomsGenerated[1]];
        lista.push(answerOne);
        const answerTwo = cartas[randomsGenerated[2]];
        lista.push(answerTwo);
        setAnswers(lista.sort(() => Math.random() - 0.5));
      }
    } else {
      alert("Agrega m??s cartas 4 cartas para generar un Quiz");
    }
  };

  const handleChangeRadio = (e) => {
    setAnswerSelected(e.target.value);
    console.log(e.target.id);
    setChecked(e.target.id);
  };
  const handleAnswer = () => {
    setIsSent(true);
    // setChecked(-1);
    if (answerSelected === cardPicked.cardMeaning) {
      console.log("correct");
      setResult(true);
      helpHttp().post(urlIncreaseScore);
    } else {
      console.log("incorrect");
      setResult(false);
    }
  };

  const openModalQuestion = (e) => {
    // e.preventDefault();
    if (!cards.cards) {
      alert("Agrega m??s cartas UwU");
      return;
    } else {
      generateQuestion();
      modalQuestion ? setModalQuestion(false) : setModalQuestion(true);
    }
  };
  const nextQuestion = () => {
    setAnswerSelected();
    generateQuestion();
    setResult();
    setIsSent(false);
  };

  const toggleMode = () => {
    mode ? setMode(false) : setMode(true);
  };

  const { speak, voices, cancel, speaking } = useSpeechSynthesis();
  let voice;
  voices.forEach((item) => {
    if (item.lang === "en-US") {
      voice = item;
    }
  });
  const speakCard = (word) => {
    speak({
      text: word,
      voice,
    });
    speaking && cancel();
  };
  return (
    <>
      {/* <AboutUser wasUp={result}></AboutUser> */}

      <div className="all-cards">
        {paramsUrl.section === "mis-cartas" && (
          <div className="del-cards">
            <NavLink to="/cards/delete">
              <button className="btn-delete-cards">
                <strong>Eliminar ?? Editar</strong>
              </button>
            </NavLink>
          </div>
        )}

        <Swiper
          keyboard={true}
          mousewheel={true}
          className="mySwiper"
          effect={"cards"}
          modules={[EffectCards, Mousewheel, Pagination, Keyboard]}
        >
          {/* <CardTuto></CardTuto> */}
          {!cards ? (
            <Loader></Loader>
          ) : !cards.cards ? (
            <div className="nada-por-aqui">
              <strong>Nada por aqui... Agrega tus cartas ????</strong>
            </div>
          ) : (
            cards.cards.map((card, key) => {
              // console.log(cards);
              return (
                <SwiperSlide
                  style={{
                    borderColor: "white",
                    backgroundImage:
                      "url(" +
                      (card.imageURL === ""
                        ? urlImageCard + card.cardImage
                        : card.imageURL) +
                      ")",
                  }}
                  className="swiper-slide-card"
                  key={card.id}
                >
                  <div className="container-card">
                    <div className="card">
                      <div className="contenido-card">
                        <h3 onClick={handleDisplay} className="card-text">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                      </div>
                    </div>
                    <button
                      className="btn-sound-card"
                      onClick={() => {
                        speakCard(card.cardTitle);
                      }}
                    >
                      <img className="word-sound" src={wordSound} alt="" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
        {paramsUrl.section === "mis-cartas" && (
          <div className="container-icon-add">
            {cards.cards && cards.cards.length >= 10 && !isPremium ? (
              <>
                <div className="container-updatein-card">
                  <div className="alert-no-more-cards">
                    <strong>
                      Para seguir agregando cartas, actual??zate a premium
                    </strong>
                  </div>
                  <div>
                    <PayPal></PayPal>
                  </div>
                </div>
              </>
            ) : (
              <img
                onClick={openModal}
                className="icon-add"
                src={iconAdd}
                alt=""
              />
            )}
          </div>
        )}
        {cards.cards && cards.cards.length > 3 && (
          <Modal
            // className="modal-card-question"
            ariaHideApp={false}
            style={customStyles}
            isOpen={modalQuestion}
            contentLabel="Minimal Modal Example"
            // className="modal-quiz"
          >
            <OutsideClickHandler
              onOutsideClick={() => {
                hideQuestion();
              }}
            >
              <label className="switch">
                <input type="checkbox" onClick={toggleMode} />
                <span className="slider"></span>
              </label>
              {cardPicked && (
                <>
                  <div
                    style={{ color: mode ? "black" : "white" }}
                    className="container-question-card"
                  >
                    <div className="question-card">
                      Elige el significado de
                      <strong> {cardPicked.cardTitle}</strong>
                    </div>
                    <div className="parent-answers">
                      {answers &&
                        answers.map((answer, key) => {
                          return (
                            <div key={answer.id} className="box-answers">
                              <label
                                className={
                                  cardPicked.cardMeaning ===
                                    answer.cardMeaning &&
                                  isSent &&
                                  !result
                                    ? "red-label showAnswer"
                                    : "rad-label"
                                }
                              >
                                <input
                                  id={key}
                                  type="radio"
                                  className="rad-input"
                                  name="rad"
                                  onChange={handleChangeRadio}
                                  value={answer.cardMeaning}
                                  checked={checked == key && true}
                                />
                                <div className="rad-design"></div>
                                <div className="rad-text">
                                  {answer.cardMeaning}
                                </div>
                              </label>
                            </div>
                          );
                        })}
                    </div>

                    <div className="container-result-message">
                      <div
                        className={
                          isSent
                            ? result
                              ? "message-question answer-right"
                              : "message-question answer-wrong"
                            : "hide"
                        }
                      >
                        {result ? (
                          "Correcto"
                        ) : (
                          <span>
                            Incorrecto
                            <br />
                            {/* <span style={{ fontSize: "15px" }}>
                            Respuesta: <strong>{cardPicked.cardMeaning}</strong>
                          </span> */}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="parent-btn">
                      <button
                        className={isSent ? "hide" : "btn-send-answer"}
                        onClick={handleAnswer}
                      >
                        Enviar
                      </button>
                    </div>
                    <div
                      className="next-quest"
                      style={{
                        bottom: isSent ? "0" : "-65px",
                      }}
                      onClick={nextQuestion}
                    >
                      <img
                        onClick={nextQuestion}
                        className="next-icon"
                        src={next}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className={
                      result
                        ? "upScore-indicator upScoreAnimation"
                        : "upScore-indicator"
                    }
                  >
                    <strong>+1XP</strong>
                  </div>
                </>
              )}
            </OutsideClickHandler>
          </Modal>
        )}
        {isPremium && (
          <div className="cont-btn-review">
            <button
              className="css-button-shadow-border-sliding--sky "
              onClick={openModalQuestion}
            >
              Quiz
            </button>
          </div>
        )}
      </div>
      <FormCard
        fetchApi={fetchAPi}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      ></FormCard>

      <MenuBar wasUp={result}></MenuBar>
    </>
  );
};

export default Cards;
