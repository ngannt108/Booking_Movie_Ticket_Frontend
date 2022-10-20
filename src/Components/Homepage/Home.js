import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import Carousel from "../Carousel/Carousel";
import { API_MOVIE } from "../../common/ApiController";

export default function Home() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_MOVIE.COMING)
      .then((res) => res.json())
      .then((dt) => {
        store.lsShowingMovie.ShowingMovieDispatch({
          type: "GETSHOWINGMOVIES",
          payload: dt.data,
        });
      });
    fetch(API_MOVIE.COMING)
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ComingMovieDispatch({
          type: "GETCOMINGMOVIES",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Carousel />
    </div>
  );
}
