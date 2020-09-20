import { combineReducers } from "redux";
import productsEntitiesReducer from "./entities";
import productsIndexReducer from "./index";

const productsReducer = combineReducers({
  entities: productsEntitiesReducer,
  index: productsIndexReducer,
  // new: productsNewReducer,
  // edit: productsUpdateReducer,
  // show: productsShowReducer
});

export default productsReducer;
