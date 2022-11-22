import { useReducer } from "react";
function GetUser(state, { type, payload }) {
  switch (type) {
    case "GETALL":
      return { ...state, users: payload };
    case "GETDETAIL":
      const found = state.users.find((item) => item.tentaiKhoan == payload);
      // console.log(">> GETDETAIL", found);
      if (found) return { ...state, detail: found };
    default:
      return state;
  }
}

function Users() {
  return useReducer(GetUser, []);
}

export default Users;
