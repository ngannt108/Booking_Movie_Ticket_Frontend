import { useReducer } from "react";
function GetMovies(state, { type, payload }) {
  switch (type) {
    case "GETSHOWINGMOVIES":
      return { ...state, listMovie: payload };
    case "GETCOMINGMOVIES":
      return { ...state, listMovie: payload };
    case "UPDATEDETAILMOVIE":
      return { ...state, updateMovie: payload };
    case "GETDETAILMOVIE":
      return { ...state, detailMovie: payload };
    case "ADDMOVIE":
      return { ...state, movie: payload };
    case "TOPMOVIES":
      return { ...state, topMovies: payload };

    default:
      return state;
  }
}

function ListMovie() {
  return useReducer(GetMovies, []);
}

export default ListMovie;
