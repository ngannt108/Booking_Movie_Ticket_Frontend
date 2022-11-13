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
import Admin from "./Page/Admin/Admin";
import Payment from "./Components/Payment/Payment";

function App() {
  const store = useContext(StoreContext);
  useEffect(() => {
    store.account.AccountDispatch({
      type: "ACCOUNT",
      payload: sessionStorage.getItem("taiKhoan"),
    });
  }, [store.account]);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Content động */}
          <Route path="/" element={<Home />} />
          <Route path="/Admin/*" element={<Admin />} />
          {/* <Route path="/Admin/movie" element={<AddMovieForm />} />
          <Route path="/Admin/:slug/showtimes" element={<Showtimes />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Movie/*" element={<Movies />}></Route>
          <Route path="/Theaters" element={<Theaters />} />
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
