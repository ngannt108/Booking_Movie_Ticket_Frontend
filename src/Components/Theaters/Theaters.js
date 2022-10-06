import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";

export default function Theaters() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_MOVIE.THEATERS)
      .then((res) => res.json())
      .then((dt) => {
        store.lsTheater.TheaterDispatch({
          type: "GETTHEATERS",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{console.log(store)}</div>;
}
