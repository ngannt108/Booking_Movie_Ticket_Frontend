import { useReducer } from "react";
function GetMovies(state, { type, payload }) {
  switch (type) {
    case "GETSHOWINGMOVIES":
      return { ...state, lsShowingMovie: payload };
    case "GETCOMINGMOVIES":
      state.lsComingMovie = payload;
      return { ...state };
    default:
      return state;
  }
}

function ListMovie() {
  return useReducer(GetMovies, []);
}

export default ListMovie;
