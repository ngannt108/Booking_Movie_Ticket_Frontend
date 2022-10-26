import { useReducer } from "react";

function GetBooking(state, { type, payload }) {
  switch (type) {
    case "BOOKING":
      return { ...state, booking: payload };
    default:
      return state;
  }
}

function Booking() {
  return useReducer(GetBooking, []);
}

export default Booking;
