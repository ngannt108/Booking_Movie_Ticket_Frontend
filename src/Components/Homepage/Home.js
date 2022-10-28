import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import Carousel from "../Carousel/Carousel";
import { API_MOVIE, API_ROOMS } from "../../common/ApiController";
import NewIn from "../NewIn/NewIn";
import Soon from "../Soon/Soon";

export default function Home() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_MOVIE.SHOWING)
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
    fetch(API_ROOMS.GET)
      .then((res) => res.json())
      .then((dt) => {
        store.lsRooms.GetRoomsDispatch({
          type: "GETROOMS",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Carousel />
      <NewIn />
      <Soon />
    </div>
  );
}
