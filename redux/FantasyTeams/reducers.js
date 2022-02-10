import {
  CREATE_FANTASY_TEAM_SUCCESS,
  CREATE_FANTASY_TEAM_ERROR,
  RESET_PAGE,
} from "./actions";

function fantasyTeamReducer(
  state = {
    loading: false,
    createFantasyTeamSuccess: "",
    createFantasyTeamError: "",
  },
  action
) {
  switch (action.type) {
    case CREATE_FANTASY_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        createFantasyTeamSuccess: action.payload,
      };
    case CREATE_FANTASY_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        createFantasyTeamError: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        createFantasyTeamSuccess: "",
        createFantasyTeamError: "",
      };
    default:
      return state;
  }
}

export default fantasyTeamReducer;
