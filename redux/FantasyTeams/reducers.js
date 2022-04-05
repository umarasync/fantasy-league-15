import {
  FANTASY_TEAM_CHOSEN,
} from "./actionCreators";

function fantasyTeamReducer(
  state = {
    chosenFantasyTeamData: null
  },
  action
) {
  switch (action.type) {
    case FANTASY_TEAM_CHOSEN:
      return {
        ...state,
        chosenFantasyTeamData: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}

export default fantasyTeamReducer;
