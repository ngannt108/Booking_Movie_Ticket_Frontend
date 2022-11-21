import { useReducer } from "react";
function GetFoodDrinks(state, { type, payload }) {
  switch (type) {
    case "GETALLFOODDRINKS":
      return { ...state, listFDs: payload };
    case "GETDETAILFOODDRINK":
      return { ...state, detailFD: payload };
    case "COMBOCHOSEN":
      return { combo: payload };
    default:
      return state;
  }
}

function ListFoodDrinks() {
  return useReducer(GetFoodDrinks, []);
}

export default ListFoodDrinks;
