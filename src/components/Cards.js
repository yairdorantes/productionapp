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
import AboutUser from "./AboutUser";
import CardTuto from "./CardTuto";
import MenuBar from "./MenuBar";
import { Link, NavLink, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import FormCard from "./FormCard";
let url = "";
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";
const Cards = () => {
  let { user } = useContext(AuthContext);
  const paramsUrl = useParams();
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [url, setUrl] = useState("");

  const [cards, setCards] = useState([]);
  const params = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const fetchAPi = async () => {
    paramsUrl.section === "mis-cartas"
      ? (url = `https://englishapputc.herokuapp.com/api/usercards/${user.user_id}`)
      : (url = `https://englishapputc.herokuapp.com/api/cards/${paramsUrl.section}`);
    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setCards(responseJSON);
    console.log(responseJSON);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  const handleDisplay = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  var speechSynthesis = require("speech-synthesis");
  const openModal = (e) => {
    // e.preventDefault();
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  // var cont = -1;
  // var arr = ["#1F1A24", "#282A36"];
  return (
    <>
      <AboutUser></AboutUser>

      <div className="all-cards">
        {paramsUrl.section === "mis-cartas" && (
          <div className="del-cards">
            <NavLink to="/delete">
              <button className="btn-delete-cards">Eliminar cartas</button>
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
            <div className="nada-por-aqui">Nada por aqui...</div>
          ) : (
            cards.cards.map((card, key) => {
              console.log(cards);
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
                      {/* <img className="image-cards" src={card.imageURL} alt="" /> */}
                      <div className="contenido-card">
                        <h3 onClick={handleDisplay} className="card-text">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                        <button
                          className="btn-sound-card"
                          onClick={() => {
                            speechSynthesis(card.cardTitle);
                            // console.log(card.cardTitle);
                          }}
                        >
                          <img className="word-sound" src={wordSound} alt="" />
                        </button>
                        <div>
                          {/* <img src={urlImageCard + card.cardImage} alt="" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
        {paramsUrl.section === "mis-cartas" && (
          <div className="container-icon-add">
            <img
              onClick={openModal}
              className="icon-add"
              src={iconAdd}
              alt=""
            />
          </div>
        )}
      </div>
      <FormCard
        fetchApi={fetchAPi}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      ></FormCard>
      <MenuBar></MenuBar>
    </>
  );
};

export default Cards;
