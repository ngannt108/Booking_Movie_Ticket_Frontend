import { useReducer } from "react";
function GetTheaters(state, { type, payload }) {
  switch (type) {
    case "GETTHEATER":
      return { ...state, lsTheater: payload };
    default:
      return state;
  }
}

function ListTheaters() {
  return useReducer(GetTheaters, []);
}

export default ListTheaters;
