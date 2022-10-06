import React, { createContext } from "react";
import ReducerMovie from "../Reducer/ReducerMovies";
import ReducerTheater from "../Reducer/ReducerTheaters";
export const StoreContext = createContext(null);
const Store = ({ children }) => {
  const [comingMovie, DispatchComingMovie] = ReducerMovie();
  const [showingMovie, DispatchShowingMovie] = ReducerMovie();
  const [theaters, DispatchTheater] = ReducerTheater();
  const store = {
    lsComingMovie: {
      ComingMovie: comingMovie,
      ComingMovieDispatch: DispatchComingMovie,
    },
    lsShowingMovie: {
      ShowingMovie: showingMovie,
      ShowingMovieDispatch: DispatchShowingMovie,
    },
    lsTheater: {
      Theater: theaters,
      TheaterDispatch: DispatchTheater,
    },
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default Store;
