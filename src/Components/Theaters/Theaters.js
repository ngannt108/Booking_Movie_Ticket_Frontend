import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_THEATERS } from "../../common/ApiController";

export default function Theaters() {
  const store = useContext(StoreContext);
  useEffect(() => {
    fetch(API_THEATERS.THEATERS)
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
