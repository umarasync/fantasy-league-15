// Packages
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

// Reducers
import authReducer from "redux/Auth/reducers";
import playersReducer from "redux/Players/reducers";
import fantasyTeamReducer from "redux/FantasyTeams/reducers";
import sideDrawerReducer from "redux/SideDrawer/reducers";
import fantasyLeagueReducer from "redux/FantasyLeagues/reducers";

let rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  fantasyTeam: fantasyTeamReducer,
  fantasyLeague: fantasyLeagueReducer,
  sideDrawer: sideDrawerReducer,
});

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
