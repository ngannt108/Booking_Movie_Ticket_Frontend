import React, { createContext } from "react";
import ReducerMovies from "../Reducer/ReducerMovies";
import ReducerAccounts from "../Reducer/ReducerAccounts";
import ReducerTheaters from "../Reducer/ReducerTheaters";
import ReducerBooking from "../Reducer/ReducerBooking";
import RecducerShowtimes from "../Reducer/ReducerShowtimes";
import ReducerFoodDrinks from "../Reducer/ReducerFoodDrinks";
import ReducerTicketBookings from "../Reducer/ReducerTicketBookings";
import ReducerUsers from "../Reducer/ReducerUsers";
export const StoreContext = createContext(null);
const Store = ({ children }) => {
  const [comingMovie, DispatchComingMovie] = ReducerMovies();
  const [showingMovie, DispatchShowingMovie] = ReducerMovies();
  const [theaters, DispatchTheater] = ReducerTheaters();
  const [lsMovieInTheater, DispatchMoviesInTheater] = ReducerTheaters();
  const [userAcc, DispatchAccount] = ReducerAccounts(null);
  const [profile, DispatchProfile] = ReducerAccounts(null);
  const [detailMovie, DispatchDetailMovie] = ReducerMovies();
  const [updateMovie, DispatchUpdateMovie] = ReducerMovies();
  const [addMovie, DispatchAddMovie] = ReducerMovies();
  const [rooms, DispatchGetRooms] = RecducerShowtimes();
  const [booking, DispatchBooking] = ReducerBooking(null);
  const [payment, DispatchPayment] = ReducerBooking(null);
  const [lsFDs, DispatchGetAllFDs] = ReducerFoodDrinks(null);
  const [detailFD, DispatchGetDetailFD] = ReducerFoodDrinks(null);
  const [addFD, DispatchAddFD] = ReducerFoodDrinks(null);
  const [combo, DispatchFoodAndDrink] = ReducerFoodDrinks(null);
  const [getAllTicketBooking, DispatchTicketBooking] =
    ReducerTicketBookings(null);
  const [getTicketsByTime, DispatchGetTicketsByTime] =
    ReducerTicketBookings(null);
  const [topMovies, DispatchTopMovies] = ReducerMovies(null);
  const [users, DispatchUsers] = ReducerUsers(null);

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

      TopMovies: topMovies,
      TopMoviesDispatch: DispatchTopMovies,
    },
    ticketBooking: {
      GetAllTicketBooking: getAllTicketBooking,
      TicketBookingDispatch: DispatchTicketBooking,

      GetTicketsByTime: getTicketsByTime,
      GetTicketsByTimeDispatch: DispatchGetTicketsByTime,
    },
    fooddrinks: {
      LsFDs: lsFDs,
      GetAllDispatch: DispatchGetAllFDs,

      DetailFD: detailFD,
      GetDetailFDDispatch: DispatchGetDetailFD,

      AddFD: addFD,
      AddFDDispatch: DispatchAddFD,

      FoodAndDrink: combo,
      FoodAndDrinkDispatch: DispatchFoodAndDrink,
    },
    lsRooms: {
      Rooms: rooms,
      GetRoomsDispatch: DispatchGetRooms,
    },
    lsTheater: {
      Theater: theaters,
      TheaterDispatch: DispatchTheater,
      MoviesInTheater: lsMovieInTheater,
      MoviesInTheaterDispatch: DispatchMoviesInTheater,
    },
    account: {
      userAccount: userAcc,
      AccountDispatch: DispatchAccount,
      Profile: profile,
      ProfileDispatch: DispatchProfile,
    },
    bookingRoom: {
      Booking: booking,
      BookingDispatch: DispatchBooking,
      Payment: payment,
      PaymentDisPatch: DispatchPayment,
    },
    users: {
      listUsers: users,
      UsersDispatch: DispatchUsers,
    },
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default Store;
