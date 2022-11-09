import { useReducer } from "react";
function GetFoodsDrinks(state, { type, payload }) {
    switch (type) {
        case "GETALLFOODSDRINKS":
            return { ...state, listFDs: payload };
        default:
            return state;
    }
}

function ListFoodsDrinks() {
    return useReducer(GetFoodsDrinks, []);
}

export default ListFoodsDrinks;
