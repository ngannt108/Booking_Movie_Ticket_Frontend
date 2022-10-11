import { useReducer } from "react";
function GetMovie(state, { type, payload }) {
  switch (type) {
    case "GETSHOWINGMOVIE":
      return { ...state, lsShowingMovie: payload };
    case "GETCOMINGMOVIE":
      //state.lsComingMovie = payload;
      //return { ...state };
      return { ...state, lsComingMovie: payload };
    case "GETDETAILMOVIE":
      return { ...state, detailMovie: payload };
    case "UPDATEDETAILMOVIE":
      return { ...state, updateMovie: payload };
    case "ADDMOVIE":
      return { ...state, detailMovie: payload };
    default:
      return state;
  }
}

function ListMovie() {
  return useReducer(GetMovie, []);
}

export default ListMovie;
