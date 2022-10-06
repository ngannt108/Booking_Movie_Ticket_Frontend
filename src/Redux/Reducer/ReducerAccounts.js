import { useReducer } from "react";
function GetAccount(state, { type, payload }) {
  switch (type) {
    case "SIGNIN":
      return { ...state, user: payload };
    case "SIGNUP":
      return { ...state, user: payload };
    default:
      return state;
  }
}

function Accounts() {
  return useReducer(GetAccount, []);
}

export default Accounts;
