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
// import "./App.css";
import Footer from "./Components/Footer/Footer";
import Payment from "./Components/Payment/Payment";
import Profile from "./Components/Profile/Profile";
import { API_USER, API_BOOKING } from "./Common/ApiController";
import PrivateUserRoutes from "./utils/PrivateUserRoutes";
import ChangeTicket from "./Components/ChangeTicket/ChangeTicket";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap"; // <-- JS File


function App() {
  const store = useContext(StoreContext);
  // let date = new Date();
  // let getDay = date.getDay();

  // useEffect(() => {
  //   RemindEmail();
  // }, [getDay]);

  // const RemindEmail = async () => {
  //   const res = await fetch(API_BOOKING.REMIND_EMAIL);
  //   console.log(res.status);
  //   await fetch(API_BOOKING.REMIND_EMAIL);
  // };

  useEffect(() => {
    store.account.AccountDispatch({
      type: "ACCOUNT",
      payload: localStorage.getItem("taiKhoan"),
    });
  }, [localStorage.getItem("taiKhoan")]);

  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(localStorage.getItem("token"));
      fetch(API_USER.PROFILE, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((dt) => {
          store.account.ProfileDispatch({
            type: "PROFILE",
            payload: dt.data[0],
          });
        });
    }
  }, [store.account.userAccount.account]);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Content động */}
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Movie/*" element={<Movies />}></Route>
          <Route path="/Theaters" element={<Theaters />} />
          <Route element={<PrivateUserRoutes />}>
            <Route path="/Booking" element={<Booking />}></Route>
            <Route path="/Payment" element={<Payment />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/ChangeTicket" element={<ChangeTicket />}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
