import React, { useEffect, useContext } from "react";
import { StoreContext } from "./Redux/Store/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Homepage/Home";
import Theaters from "./Components/Theaters/Theaters";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Movies from "./Components/Movies/Movies";
import Booking from "./Components/Booking/Booking";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import AdminMovies from "./Page/Admin/AdminMovies";
import HeaderAdmin from "./Page/Admin/Header/HeaderAdmin";
import AdminFoodsDrinks from "./Page/Admin/AdminFoodsDrinks";
import Payment from "./Components/Payment/Payment";
import Profile from "./Components/Profile/Profile";
import { API_USER } from "./common/ApiController";

function App() {
  const store = useContext(StoreContext);
  useEffect(() => {
    store.account.AccountDispatch({
      type: "ACCOUNT",
      payload: sessionStorage.getItem("taiKhoan"),
    });
  }, [sessionStorage.getItem("taiKhoan")]);

  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(sessionStorage.getItem("token"));
      fetch(API_USER.PROFILE, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((dt) =>
          store.account.ProfileDispatch({
            type: "PROFILE",
            payload: dt.data[0],
          })
        );
    }
  }, [store.account.userAccount.account]);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Content động */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/Admin/Foods" element={<AdminFoodsDrinks />} /> */}
          <Route path="/Admin/*" element={<HeaderAdmin />} />

          {/* <Route path="/Admin/movie" element={<AddMovieForm />} />
          <Route path="/Admin/:slug/showtimes" element={<Showtimes />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Movie/*" element={<Movies />}></Route>
          <Route path="/Theaters" element={<Theaters />} />
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
