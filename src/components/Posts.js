import "./styles/postCards.css";
import { useContext, useEffect, useState } from "react";
import Heart from "react-heart";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
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
