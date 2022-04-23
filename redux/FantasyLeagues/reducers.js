import {
  FANTASY_LEAGUE_CREATION_START,
  FANTASY_LEAGUE_CREATION_SUCCESS,
  FANTASY_LEAGUE_CREATION_FAILED,
  FANTASY_LEAGUE_JOINED_START,
  FANTASY_LEAGUE_JOINED_SUCCESS,
  FANTASY_LEAGUE_JOINED_FAILED,
} from "./actionCreators";

function fantasyLeagueReducer(
  state = {
    // Loading States
    loadingFantasyLeagueCreation: false,
    loadingFantasyLeagueJoining: false,
    // Data states
    leagues: [],
  },
  action
) {
  switch (action.type) {
    /** Fantasy League Creation **/
    case FANTASY_LEAGUE_CREATION_START:
      return {
        ...state,
        loadingFantasyLeagueCreation: true,
      };
    case FANTASY_LEAGUE_CREATION_SUCCESS:
      return {
        ...state,
        loadingFantasyLeagueCreation: false,
      };
    case FANTASY_LEAGUE_CREATION_FAILED:
      return {
        ...state,
        loadingFantasyLeagueCreation: false,
      };

    /** Fantasy Team Joining **/
    case FANTASY_LEAGUE_JOINED_START:
      return {
        ...state,
        loadingFantasyLeagueJoining: true,
      };
    case FANTASY_LEAGUE_JOINED_SUCCESS:
      return {
        ...state,
        loadingFantasyLeagueJoining: false,
      };
    case FANTASY_LEAGUE_JOINED_FAILED:
      return {
        ...state,
        loadingFantasyLeagueJoining: false,
      };
    /** Default State **/
    default:
      return {
        ...state,
      };
  }
}

export default fantasyLeagueReducer;
