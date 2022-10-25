import { Routes, Route, Form } from "react-router-dom";
import Cards from "../components/Cards";
// import LoginAuth from "../components/LoginAuth";
import LoginPage from "../components/LoginPage";
import Menu from "../components/Menu";
import Session from "../components/Session";
import { AuthProvider } from "../context/AuthContext";

import PrivateRoute from "./PrivateRoute";
import ShortsV2 from "../components/ShortsV2";
import Posts from "../components/Posts";
import PostPage from "../components/PostPage";
// import Stripe from "../components/Stripe";
import CardsMenu from "../components/CardsMenu";
import FormCard from "../components/FormCard";
import DeleteCards from "../components/DeleteCards";
const Routers = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<LoginPage />}></Route>

        <Route path="/login" element={<Session />}></Route>
        {/* <Route path="/login" element={<LoginAuth />}></Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="/cards" element={<CardsMenu />}></Route>
          <Route path="/cards/:section" element={<Cards />}></Route>

          <Route path="/shorts" element={<ShortsV2 />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/postpage/:id" element={<PostPage />}></Route>
          <Route path="/delete" element={<DeleteCards />}></Route>
          {/* <Route path="/form-card" element={<FormCard />}></Route> */}

          {/* <Route path="/stripe" element={<Stripe />}></Route> */}
          <Route path="/menu" element={<Menu />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Routers;
