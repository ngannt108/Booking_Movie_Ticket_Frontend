import React, { createContext } from "react";
import ReducerMovie from "../Reducer/ReducerMovie";
import ReducerTheater from "../Reducer/ReducerTheater";
export const StoreContext = createContext(null);
export default ({ children }) => {
  const [comingMovie, DispatchComingMovie] = ReducerMovie();
  const [showingMovie, DispatchShowingMovie] = ReducerMovie();
  const [theaters, DispatchTheater] = ReducerTheater();
  const [detailMovie, DispatchDetailMovie] = ReducerMovie();
  const [updateMovie, DispatchUpdateMovie] = ReducerMovie();
  const [addMovie, DispatchAddMovie] = ReducerMovie();

  const store = {
    lsComingMovie: {
      ComingMovie: comingMovie,
      ComingMovieDispatch: DispatchComingMovie,
    },
    lsShowingMovie: {
      ShowingMovie: showingMovie,
      ShowingMovieDispatch: DispatchShowingMovie,
    },
    movie: {
      DetailMovie: detailMovie,
      DetailMovieDispatch: DispatchDetailMovie,

      UpdateMovie: updateMovie,
      UpdateMovieDispatch: DispatchUpdateMovie,

      AddMovie: addMovie,
      AddMovieDispatch: DispatchAddMovie,

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
