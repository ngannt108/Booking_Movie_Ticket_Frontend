import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";

export default function Theaters() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch("http://localhost:5000/admin/movie/movietheater")
      .then((res) => res.json())
      .then((dt) => {
        store.lsTheater.TheaterDispatch({
          type: "GETTHEATER",
          payload: dt.data,
        });
      });
  }, []);
  return <div>{console.log(store)}</div>;
}
