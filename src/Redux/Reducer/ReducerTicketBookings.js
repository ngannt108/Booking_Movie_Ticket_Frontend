import { useReducer } from "react";
function GetTicketBookings(state = [], { type, payload }) {
  switch (type) {
    case "GETTICKETBOOKINGS":
      return { ...state, lsTicketBookings: payload };
    case "GETTICKETSBYTIME":
      console.log(">> GETTICKETSBYTIME", payload);
      return { ...state, lsTicketBookings: payload };
    default:
      return state;
  }
}

function ListTicketBookings() {
  return useReducer(GetTicketBookings, []);
}

export default ListTicketBookings;
