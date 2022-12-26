import { useReducer } from "react";

function GetBooking(state, { type, payload }) {
  switch (type) {
    case "BOOKING":
      return { ...state, booking: payload };
    case "PAYMENT":
      return { payment: payload };
    case "HISTORY":
      return { payment: payload };
    case "CHANGE_TICKET":
      return { ticket: payload };
    default:
      return state;
  }
}

function Booking() {
  return useReducer(GetBooking, []);
}

export default Booking;
