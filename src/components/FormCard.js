import { useState } from "react";
import "./styles/formCard.css";
import { helpHttp } from "../helpers/helpHttp";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ReactFileReader from "react-file-reader";
import Modal from "react-modal";
import crossOut from "../media/crossout.png";
import LoaderThin from "./LoaderThin";

const url = "https://englishapputc.herokuapp.com/api/cards/";

const customStyles = {
  content: {
    // color: "white",

    width: "350px",
    height: "350px",
    backgroundColor: "#00000000",

    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const FormCard = ({ modalIsOpen, openModal, fetchApi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  // const [modalIsOpen, setModalIsOpen] = useState(true);
  let { user } = useContext(AuthContext);

  const initialForm = {
    user: user.user_id,
    title: "",
    meaning: "",
    file: "",
    img_url: "",
  };

  // const openModal = (e) => {
  //   // e.preventDefault();
  //   modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  // };

  const [form, setForm] = useState(initialForm);

  const createData = (data) => {
    console.log(form);
    // if (!form.title === "" || !form.meaning === "" || !form.file === "") {
    if (
      form.title === "" ||
      form.meaning === "" ||
      (form.file === "" && form.img_url === "")
    ) {
      alert("llena todos los campos por favor");
    } else {
      let options = {
        body: data,
        headers: { "content-type": "multipart/form-data" },
      };
      console.log(options);
      setIsLoading(true);
      setShowBtn(false);
      helpHttp()
        .post(url, options)
        .then((res) => {
          res.err ? setMessage(true) : setMessage(false);
          fetchApi();
        });

      !message && openModal();
      setForm(initialForm);
      setShowBtn(true);
      setOptionSelected("");
      setIsLoading(false);
    }
    // } else {
    //   alert("llena");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.taget);
    console.log(form);

    createData(form);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFiles = (file) => {
    file && setFileSelected(true);
    setForm({
      ...form,
      ["file"]: file.base64,
    });
  };

  const handleChangeRadio = (e) => {
    setOptionSelected(e.target.value);
    console.log(optionSelected);
  };
  return (
    <Modal
      className="modal"
      ariaHideApp={false}
      style={customStyles}
      isOpen={modalIsOpen}
      // contentLabel="Minimal Modal Example"
    >
      <img
        style={{ margin: "10px" }}
        className="cross-out"
        onClick={openModal}
        src={crossOut}
        alt=""
      />
      <div className="container-form-card">
        <div className="form-card">
          <div>
            <h3>¡Sube tus cartas!</h3>
          </div>
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input-form-card"
              type="text"
              placeholder="Palabra en ingles"
            />
          </div>
          <div>
            <input
              name="meaning"
              value={form.meaning}
              onChange={handleChange}
              className="input-form-card"
              type="text"
              placeholder="signicado"
            />
          </div>
          <h2></h2>
          <br />
          <div>
            Enviar imagen en:
            <br />
            <label htmlFor="file">Archivo </label>
            <input
              onChange={handleChangeRadio}
              id="file"
              name="btn-radio"
              type="radio"
              value="file"
            />
            <br />
            <label htmlFor="url">Url </label>
            <input
              onChange={handleChangeRadio}
              id="url"
              name="btn-radio"
              type="radio"
              value="url"
            />
          </div>
          <div></div>
          {optionSelected === "file" ? (
            <div className="main_div">
              <ReactFileReader handleFiles={handleFiles} base64={true}>
                <button>
                  {fileSelected
                    ? "Archivo seleccionado 😀"
                    : "Selecciona imagen"}
                </button>
              </ReactFileReader>
            </div>
          ) : (
            optionSelected === "url" && (
              <div>
                <input
                  name="img_url"
                  value={form.img_url}
                  onChange={handleChange}
                  className="input-form-card"
                  type="text"
                  placeholder="Dirección de la imagen"
                />
              </div>
            )
          )}
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className={showBtn ? "btn-send-card" : "hide-btn-send-card"}
            >
              Enviar
            </button>
          </div>
          {isLoading && <LoaderThin></LoaderThin>}
        </div>
      </div>

      {message && (
        <div style={{ textAlign: "center", color: "red" }}>
          ups Algo salio mal, intentalo de nuevo
        </div>
      )}
    </Modal>
  );
};

export default FormCard;
