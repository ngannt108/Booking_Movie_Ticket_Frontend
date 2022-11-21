import { useReducer } from "react";
function GetTheaters(state, { type, payload }) {
  switch (type) {
    case "GETTHEATERS":
      return { ...state, lsTheater: payload };
    case "LISTMOVIESINTHEATER":
      return { moviesInTheater: payload };
    default:
      return state;
  }
}

function ListTheaters() {
  return useReducer(GetTheaters, []);
}

export default ListTheaters;
