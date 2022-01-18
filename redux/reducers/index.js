import { combineReducers } from "redux";
import authReducer from "./auth";

let rootReducer = combineReducers({
  auth: authReducer
});
export default rootReducer;
