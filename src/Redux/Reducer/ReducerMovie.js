import { useReducer } from "react";
function GetMovie(state, { type, payload }) {
  switch (type) {
    case "GETSHOWINGMOVIE":
      return { ...state, lsShowingMovie: payload };
    case "GETCOMINGMOVIE":
      state.lsComingMovie = payload;
      return { ...state };
    default:
      return state;
  }
}
export default () => useReducer(GetMovie, []);
