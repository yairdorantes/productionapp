import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";

import Modal from "react-modal";
import MenuBar from "./MenuBar";
const customStyles = {
  content: {
    // color: "white",

    width: "350px",
    height: "350px",
    backgroundColor: "#00000000",

    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#171515ce" },
};
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const DeleteCards = () => {
  let { user } = useContext(AuthContext);

  const [cards, setCards] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardId, setCardId] = useState();
  const [actualCardTitle, setActualCardTitle] = useState("");
  //   const [actualCardImg, setActualCardImg] = useState("");
  const fetchAPi = async () => {
    let url = `https://englishapputc.herokuapp.com/api/usercards/${user.user_id}`;

    const response = await fetch(url);
    const responseJSON = await response.json();
    setCards(responseJSON);
    console.log(responseJSON);
  };
  const deleteCardF = () => {
    let urlDel = `https://englishapputc.herokuapp.com/api/delcard/${cardId}`;

    helpHttp()
      .del(urlDel)
      .then((res) => {
        console.log(res);
        setModalIsOpen(false);
        fetchAPi();
      });
  };
  const openModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  const getCurrentData = (title, id) => {
    setActualCardTitle(title);
    setCardId(id);
    // setActualCardImg(img);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  return (
    <>
      <div className="container-cards-delete">
        {!cards ? (
          <Loader></Loader>
        ) : !cards.cards ? (
          <div>Nada para borrar</div>
        ) : (
          cards.cards.map((card) => {
            return (
              <div key={card.id} className="container-card-delete">
                <h3 style={{ textAlign: "center", margin: "5px" }}>
                  {card.cardTitle}
                </h3>
                <img
                  className="delete-img-card"
                  src={
                    card.cardImage === ""
                      ? card.imageURL
                      : urlImageCard + card.cardImage
                  }
                  alt=""
                />
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => {
                      openModal();
                      getCurrentData(card.cardTitle, card.id);
                    }}
                    className="btn-delete-card"
                  >
                    <h4>Eliminar</h4>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Modal
        className="modal-delete-card"
        ariaHideApp={false}
        style={customStyles}
        isOpen={modalIsOpen}
      >
        <div style={{ textAlign: "center" }}>
          <div className="container-alert-text">
            <h2>
              ¡Se eliminara la carta:
              <span
                style={{
                  backgroundColor: "white",
                  color: "#087FFF",
                  borderRadius: "5px",
                }}
              >
                {actualCardTitle}
              </span>
              !
            </h2>
          </div>
          <button onClick={deleteCardF} className="btn-delete-card">
            <h3>ok</h3>
          </button>
          <button className="btn-cancel-delete" onClick={openModal}>
            <h3>Cancelar</h3>
          </button>
        </div>
      </Modal>
      <MenuBar></MenuBar>
    </>
  );
};

export default DeleteCards;
