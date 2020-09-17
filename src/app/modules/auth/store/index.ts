import { combineReducers } from "redux";
import authCurrentUserReducer from "./current-user/reducer"

const authReducer = combineReducers({
  currentUser: authCurrentUserReducer
});

export default authReducer;
