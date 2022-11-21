import "./styles/formStyles.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import mySite from "./Domain";
import eyes from "../media/eye2.png";
import closeye from "../media/eyeclose.png";
let url = `${mySite}users/`;
const initialForm = {
  name: "",
  email: "",
  password: "",
};
const LoginPage = () => {
  let { loginUser, logoutUser } = useContext(AuthContext);
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();

  const [db, setDb] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [registered, setRegistered] = useState(false);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    // data.id = Date.now();

    helpHttp()
      .post(url, options)
      .then((res) => {
        console.log(res);
        // if (!res.err) {
        //   setDb([...db, res]);
        //   //   setLoading(false);
        // } else {
        //   console.log(res);
        //   // setError(res);
        // }
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please enter your email and password");
      return;
    } else {
      setRegistered(true);
      // logoutUser();
      navigate("/menu");
    }
    setForm((form["password"] = form["password"]));
    createData(form);
    console.log(form["password"]);
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  const toggleEye = () => {
    eye ? setEye(false) : setEye(true);
  };

  return (
    <>
      <div className="login-form">
        <div className="login-container">
          <form className="form">
            <input
              onChange={handleChange}
              className="parrafo"
              name="name"
              placeholder="Nombre de usuario"
              type="text"
              value={form.name}
            />
            <input
              onChange={handleChange}
              className="parrafo"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
            />

            <input
              onChange={handleChange}
              className="parrafo"
              name="password"
              placeholder="Password"
              type={eye ? "text" : "password"}
              value={form.password}
            />
            {form.password != "" && (
              <span className="eye eye-create">
                <img
                  className="eye-icon"
                  onClick={toggleEye}
                  src={eye ? eyes : closeye}
                  alt=""
                />
              </span>
            )}
            <div className="btn-register">
              <button onClick={handleSubmit} type="submit">
                Registrar
              </button>
              <Link
                style={{ color: "#0781df", textDecoration: "none" }}
                className="link-to-signup"
                to={"/login"}
              >
                <div>Login</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
