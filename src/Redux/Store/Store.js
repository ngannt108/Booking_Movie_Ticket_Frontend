import React, { createContext } from "react";
import ReducerMovies from "../Reducer/ReducerMovies";
import ReducerAccounts from "../Reducer/ReducerAccounts";
import ReducerTheaters from "../Reducer/ReducerTheaters";
import ReducerBooking from "../Reducer/ReducerBooking";
import RecducerShowtimes from "../Reducer/ReducerShowtimes";
import ReducerFoodDrinks from "../Reducer/ReducerFoodDrinks";
import AllFoodDrinks from "../../Page/Admin/FoodDrinks/AllFoodDrinks";
export const StoreContext = createContext(null);
const Store = ({ children }) => {
  const [comingMovie, DispatchComingMovie] = ReducerMovies();
  const [showingMovie, DispatchShowingMovie] = ReducerMovies();
  const [theaters, DispatchTheater] = ReducerTheaters();
  const [userAcc, DispatchAccount] = ReducerAccounts(null);
  const [detailMovie, DispatchDetailMovie] = ReducerMovies();
  const [updateMovie, DispatchUpdateMovie] = ReducerMovies();
  const [addMovie, DispatchAddMovie] = ReducerMovies();
  const [rooms, DispatchGetRooms] = RecducerShowtimes();
  const [booking, DispatchBooking] = ReducerBooking(null);
  const [lsFDs, DispatchGetAllFDs] = ReducerFoodDrinks(null);
  const [detailFD, DispatchGetDetailFD] = ReducerFoodDrinks(null);
  const [addFD, DispatchAddFD] = ReducerFoodDrinks(null);

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
    fooddrinks: {
      LsFDs: lsFDs,
      GetAllDispatch: DispatchGetAllFDs,

      DetailFD: detailFD,
      GetDetailFDDispatch: DispatchGetDetailFD,

      AddFD: addFD,
      AddFDDispatch: DispatchAddFD,
    },
    lsRooms: {
      Rooms: rooms,
      GetRoomsDispatch: DispatchGetRooms,
    },
    lsTheater: {
      Theater: theaters,
      TheaterDispatch: DispatchTheater,
    },
    account: {
      userAccount: userAcc,
      AccountDispatch: DispatchAccount,
    },
    bookingRoom: {
      Booking: booking,
      BookingDispatch: DispatchBooking,
    },
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default Store;
