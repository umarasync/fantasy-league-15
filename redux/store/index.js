import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import authReducer from "../Auth/reducers";
import teamsReducer from "../Teams/reducers";

let rootReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
});


let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;