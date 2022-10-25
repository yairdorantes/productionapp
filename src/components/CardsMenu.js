import MenuBar from "./MenuBar";
import people from "../media/youth.png";
import animals from "../media/ganado.png";
import things from "../media/things.png";
import tech from "../media/digital.png";
import mine from "../media/experiencia.png";
import "./styles/menuCards.css";
import { Link } from "react-router-dom";

const CardsMenu = () => {
  return (
    <>
      <div className="bg-menu-cards">
        <div className="container-menu-cards">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/cards/personas"
          >
            <div className="sub-menu">
              <div className="square-background-cards">
                <div className="container-img-text-sub-cards">
                  <div className="container-img-sub-card">
                    <img className="img-sub-cards" src={people} alt="" />
                  </div>
                  <div className="container-text-sub-cards">Personas</div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/cards/animales"
          >
            <div className="sub-menu">
              <div className="square-background-cards">
                <div className="container-img-text-sub-cards">
                  <div className="container-img-sub-card">
                    <img className="img-sub-cards" src={animals} alt="" />
                  </div>
                  <div className="container-text-sub-cards">Animales</div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/cards/objetos"
          >
            <div className="sub-menu">
              <div className="square-background-cards">
                <div className="container-img-text-sub-cards">
                  <div className="container-img-sub-card">
                    <img className="img-sub-cards" src={things} alt="" />
                  </div>
                  <div className="container-text-sub-cards">Objetos</div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/cards/tecnologia"
          >
            <div className="sub-menu">
              <div className="square-background-cards">
                <div className="container-img-text-sub-cards">
                  <div className="container-img-sub-card">
                    <img className="img-sub-cards" src={tech} alt="" />
                  </div>
                  <div className="container-text-sub-cards">Tecnologia</div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/cards/mis-cartas"
          >
            <div className="sub-menu">
              <div className="square-background-cards">
                <div className="container-img-text-sub-cards">
                  <div className="container-img-sub-card">
                    <img className="img-sub-cards" src={mine} alt="" />
                  </div>
                  <div className="container-text-sub-cards">Mis cartas</div>
                </div>
              </div>
            </div>
          </Link>
          {/* <div className="sub-menu">Animales</div>
          <div className="sub-menu">Objetos</div>
          <div className="sub-menu">Tecnologia</div>
          <div className="sub-menu">Mis cartas</div> */}
        </div>
        <MenuBar></MenuBar>
      </div>
    </>
  );
};

export default CardsMenu;
