import "./styles/modalStyles.css";
import usuario from "../media/user.png";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import PayPal from "./PayPal";
import closeUser from "../media/logout.png";
import vip from "../media/vip.png";
import crossOut from "../media/crossout.png";
import OutsideClickHandler from "react-outside-click-handler";
import "./styles/shinytext.css";
// Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.83)";
const customStyles = {
  content: {
    color: "white",
    width: "270px",
    height: "450px",
    backgroundColor: "#16181cf2",
    border: "solid 1px #040615",
    // backgroundColor: "#00000000",
    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0)" },
};

const AboutUser = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let { user, logoutUser } = useContext(AuthContext);
  const [scoreUser, setScoreUser] = useState();
  const [isPremium, setIsPremium] = useState(false);
  let url = `https://englishapputc.herokuapp.com/api/users/${user.user_id}`;
  const hideAboutUser = () => {
    setModalIsOpen(false);
  };
  // const ref = useDetectClickOutside({ onTriggered: hideAboutUser });

  const getuser = () => {
    helpHttp()
      .get(url)
      .then((res) => {
        setIsPremium(res.user.premium);
        // console.log(isPremium);
        setScoreUser(res.user.score);
      });
  };

  useEffect(() => {
    getuser();
  }, []);

  const openModal = (e) => {
    // e.preventDefault();
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  return (
    <>
      <div className="userinfo-container">
        <div className="avatar">
          <img onClick={openModal} src={usuario} alt="" />
          <Modal
            ariaHideApp={false}
            style={customStyles}
            isOpen={modalIsOpen}
            contentLabel="Minimal Modal Example"
          >
            <OutsideClickHandler
              onOutsideClick={() => {
                hideAboutUser();
              }}
            >
              <img
                className="cross-out"
                onClick={openModal}
                src={crossOut}
                alt=""
              />

              <div className="container-info-inside-modal">
                <div>
                  <h2 className="textito">
                    ¡Bienvenido{" "}
                    <span className={isPremium ? "shiny-text" : ""}>
                      {/* {console.log(isPremium)} */}
                      {user.username}
                    </span>
                    !
                  </h2>
                  <h4 style={{ textAlign: "center" }}>
                    Tu record es de: {scoreUser} pts
                  </h4>
                </div>

                <div className="user-is-vip">
                  <img className="vip-icon" src={vip} alt="" />
                  <span>
                    {isPremium
                      ? "Eres usuario premium 😃!"
                      : "Todavia no eres usuario premium ☹️ (puedes serlo pagando aqui⬇)"}
                    {!isPremium && <PayPal></PayPal>}
                  </span>
                </div>
                {/* <button class="button-pro">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              Unlock Pro
            </button> */}

                <div className="icon-text-modal-logout" onClick={logoutUser}>
                  <img className="logout-icon" src={closeUser} alt="" />
                  <span className="logout-text">Cerrar sesión</span>
                </div>
              </div>
            </OutsideClickHandler>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AboutUser;
