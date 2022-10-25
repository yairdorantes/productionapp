import "./styles/menuStyles.css";
import cards from "../media/cardss.png";
import video from "../media/play.png";
import tips from "../media/blog.png";
import { Link } from "react-router-dom";
import AboutUser from "./AboutUser";
// import MenuBar from "./MenuBar";
// import Confetti from "react-confetti";

const Menu = () => {
  return (
    <>
      {console.log("welcome yair heroku")}
      <div className="bg-menu">
        <AboutUser />
        <div className="container-menu">
          <div>
            <Link to="/cards" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={cards} alt="" />
                  </div>
                  <div className="container-name-section">Cartas</div>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/shorts" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={video} alt="" />
                  </div>
                  <div className="container-name-section">Videos</div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/posts" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={tips} alt="" />
                  </div>
                  <div className="container-name-section">Blog</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* <MenuBar></MenuBar> */}
      </div>
      {/* <Link to={"/stripe"}>
        <div>ajaja</div>
      </Link> */}
    </>
  );
};

export default Menu;
