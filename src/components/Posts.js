import "./styles/postCards.css";
import { useContext, useEffect, useState } from "react";
import Heart from "react-heart";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
// import remarkGfm from "remark-gfm";

const txt = ` ¿ada vez que buscas aprender \n\n  inglés\n rápido te encuentras con los mismos consejos de siempre?: Ve películas y series en inglés (con o sin subtítulos, dependiendo del nivel), escucha música y lee las letras, y lee libros de temas que te interesen, ¿estás buscando algo más que eso? \r\n\r\n\r\nSin duda, para iniciar con el pie derecho el aprendizaje de un idioma la clave está en el vocabulario. En muchos idiomas, la mayoría de actividades diarias, tales como viajar en transporte público o pedir comida en un restaurante, pueden ser realizadas con un aproximado de 300 palabras. Por esto, para aprender de manera rápida y fácil el idioma es básico conocer dichas palabras comunes.\r\n\r\nAsí como el anterior, en este artículo te encontrarás con una serie de consejos que van un paso más allá para que conozcas tips para aprender inglés con los que acelerarás tu curva de aprendizaje.\r\n\r\n¿Cómo elegir el mejor curso de inglés para ti? Conoce y descarga nuestro ebook para saber elegir el mejor curso de inglés  y dominar una segunda lengua.\r\n\r\nLa triada clásica para aprender inglés rápido\r\nEs importante que no descartes los tres tips para aprender inglés más conocidos. Se repiten constantemente porque son útiles, sin embargo, este artículo busca dar un paso más allá para ofrecer técnicas comprobadas que a veces están fuera del radar de estudiantes de inglés. Aún así, vale la pena partir de la base de dichos tres consejos:\r\n\r\nVe películas y series. Este consejo te permite pasar un rato de ocio mientras estudias inglés. Además te ayuda a conocer expresiones típicas.\r\n\r\nEscucha música. Las letras de canciones te dan acceso a la sonoridad de las palabras, acentos y te ayudan a aprender como pronunciar el inglés de manera correcta.\r\n\r\nLee libros. Ya sea ficción o no ficción, leer libros en inglés, desde historietas a los clásicos de la literatura inglesa, adquirirás vocabulario y gramática.`;

let url = `https://englishapputc.herokuapp.com/api/postset/`;
let like = "https://englishapputc.herokuapp.com/api/posts/";

const params = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
const Posts = () => {
  let { user } = useContext(AuthContext);
  let likedPosts = `https://englishapputc.herokuapp.com/api/posts/${user.user_id}`;

  const [likes, setLikes] = useState([]);

  const [posts, setPosts] = useState();

  const fetchAPi = async () => {
    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setPosts(responseJSON);
    // console.log(responseJSON);
  };

  const getLikedPosts = async () => {
    const response = await fetch(likedPosts, params);
    const responseJSON = await response.json();
    // setPosts(responseJSON);
    // console.log("liked", responseJSON);
    responseJSON.posts_liked_by_user.map((post) => likes.push(post.id));
    setLikes([...likes]);
  };

  useEffect(() => {
    fetchAPi();
    getLikedPosts();
  }, []);

  const handleLike = (post) => {
    let index = likes.findIndex((x) => x === post.id);
    if (index >= 0) {
      likes.splice(index, 1);
      post.likes_count -= 1;
      let options = {
        body: { is_like: false, id: post.id, user_id: user.user_id },
        headers: { "content-type": "application/json" },
      };
      helpHttp()
        .post(like, options)
        .then((res) => console.log(res.message));
    } else {
      likes.push(post.id);
      post.likes_count += 1;
      let options = {
        body: { is_like: true, id: post.id, user_id: user.user_id },
        headers: { "content-type": "application/json" },
      };
      helpHttp()
        .post(like, options)
        .then((res) => console.log(res.message));
    }
    setLikes([...likes]);
    // console.log(likes);
  };

  return (
    <>
      <div className="container-posts">
        {!posts ? (
          <Loader></Loader>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className="card-post">
                <Link to={`/postpage/${post.id}`} className="link-post">
                  <div
                    style={{ backgroundImage: "url(" + post.image_src + ")" }}
                    className="box-img-post-card"
                  >
                    {/* <img
                      className="image-post"
                      src={post.image_src}
                      alt="Avatar"
                      style={{ width: "100%", maxHeight: "100px" }}
                    /> */}
                  </div>
                  <div
                    style={{ backgroundColor: `${post.categoria.color}` }}
                    className="section-post"
                  >
                    <span>{post.categoria.name}</span>
                  </div>
                  <div className="container-card-text">
                    <h3 className="title-post-card">{post.title}</h3>
                  </div>
                </Link>

                <div className="like-post">
                  <div className="heart-box">
                    {likes.findIndex((x) => x === post.id) >= 0 ? (
                      <Heart
                        onClick={handleLike.bind(this, post)}
                        style={{ width: "20px" }}
                        isActive={true}
                      />
                    ) : (
                      <Heart
                        onClick={handleLike.bind(this, post)}
                        style={{ width: "20px" }}
                        isActive={false}
                      />
                    )}
                    <div className="number-likes-post">
                      {post.likes_count} Likes
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <MenuBar></MenuBar>
    </>
  );
};

export default Posts;
