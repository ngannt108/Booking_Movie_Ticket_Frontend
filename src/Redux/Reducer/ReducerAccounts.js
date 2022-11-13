import { useReducer } from "react";
function GetAccount(state, { type, payload }) {
  switch (type) {
    case "ACCOUNT":
      return { account: payload };
    case "INITIAL":
      return { account: payload }
    default:
      return state;
  }
}

function Accounts() {
  return useReducer(GetAccount, []);
}

export default Accounts;
