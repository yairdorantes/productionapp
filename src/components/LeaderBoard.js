import "./styles/leaderboard.css";
import first from "../media/first.png";
import second from "../media/second.png";
import third from "../media/third.png";
import usuario from "../media/user.png";
import trofeo from "../media/ganador.png";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect } from "react";
import Loader from "./Loader";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./styles/shinytext.css";
const LeaderBoard = () => {
  let { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [tops, setTops] = useState([]);
  const getTop = () => {
    helpHttp()
      .get("http://127.0.0.1:8000/api/topusers/")
      .then((res) => {
        setTops(res.topuser);
      });
    helpHttp()
      .get(`http://127.0.0.1:8000/api/users/${user.user_id}`)
      .then((res) => {
        setUserData(res.user);
        console.log(res.user.score);
      });
  };

  const [isBoard, setIsBoard] = useState(false);
  const handleLeaderboard = () => {
    isBoard ? setIsBoard(false) : setIsBoard(true);
  };
  const hideLeaderboard = () => {
    setIsBoard(false);
  };
  useEffect(() => {
    getTop();
  }, []);

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          hideLeaderboard();
        }}
      >
        <div onClick={handleLeaderboard} className="leader-board">
          <img className="trofeo" src={trofeo} alt="" />
          <div
            className={
              !isBoard ? "text-board-img" : "text-board-img hide-text-board-img"
            }
          >
            Tabla de liderazgo
          </div>
        </div>
        <div
          className={
            isBoard
              ? "container-leader-board"
              : "container-leader-board hide-leaderboard "
          }
        >
          <fieldset className="fieldset-leader">
            <legend>
              <h2>Tabla de liderazgo</h2>
            </legend>
            <div className="container-content-leader">
              <div className="container-legend-leader">
                <div>Posición</div>
                <div>Usuario</div>
                <div>Puntaje</div>
              </div>
              {!tops ? (
                <Loader></Loader>
              ) : (
                tops.map((top, key) => {
                  return (
                    <div key={key} className="container-place-icons">
                      <div className="container-place-user">
                        <div>
                          <img
                            className="place-icon"
                            src={
                              (key === 0 && first) ||
                              (key === 1 && second) ||
                              (key === 2 && third)
                            }
                            alt=""
                          />
                        </div>
                        <div className="icon-username">
                          <div>
                            <img
                              className="user-icon-leader"
                              src={usuario}
                              alt=""
                            />
                            <div
                              className={
                                top.premium === true ? "shiny-text" : ""
                              }
                            >
                              {top.username}
                            </div>
                          </div>
                        </div>
                        <div>{top.score}</div>
                      </div>
                    </div>
                  );
                })
              )}
              <div>Tu puntaje: {userData && userData.score}</div>
            </div>
          </fieldset>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default LeaderBoard;
