import {
    SAVE_FANTASY_TEAM_TO_REDUX,
    FANTASY_TEAM_CREATION_START,
    FANTASY_TEAM_CREATION_SUCCESS,
    FANTASY_TEAM_CREATION_FAILED,
    FANTASY_TEAM_TRANSFER_FAILED,
    FANTASY_TEAM_TRANSFER_START,
    FANTASY_TEAM_TRANSFER_SUCCESS,
    FANTASY_TEAM_SWAP_START,
    FANTASY_TEAM_SWAP_SUCCESS,
    FANTASY_TEAM_SWAP_FAILED,
} from "./actionCreators";

function fantasyTeamReducer(
  state = {
    // Loading States
    loadingFantasyTeamCreation: false,
    loadingFantasyTeamTransfer: false,
    loadingFantasyTeamSwapping: false,
    // Data States
    savedFantasyTeamOnRedux: null,
    // Total fantasy team budget
    totalBudget: 200000000
  },
  action
) {
  switch (action.type) {

      /** Fantasy Team Creation **/
      case SAVE_FANTASY_TEAM_TO_REDUX:
        return {
          ...state,
          savedFantasyTeamOnRedux: action.payload,
        };
      case FANTASY_TEAM_CREATION_START:
        return {
          ...state,
          loadingFantasyTeamCreation: true,
        };
      case FANTASY_TEAM_CREATION_SUCCESS:
        return {
          ...state,
          loadingFantasyTeamCreation: false,
        };
      case FANTASY_TEAM_CREATION_FAILED:
        return {
          ...state,
          loadingFantasyTeamCreation: false,
        };

    /** Fantasy Team Transfer **/
      case FANTASY_TEAM_TRANSFER_START:
        return {
          ...state,
          loadingFantasyTeamTransfer: true,
        };
      case FANTASY_TEAM_TRANSFER_SUCCESS:
        return {
          ...state,
          loadingFantasyTeamTransfer: false,
        };
      case FANTASY_TEAM_TRANSFER_FAILED:
        return {
          ...state,
          loadingFantasyTeamTransfer: false,
        };

    /** Fantasy Team Swap **/
    case FANTASY_TEAM_SWAP_START:
      return {
        ...state,
          loadingFantasyTeamSwapping: true,
      };
    case FANTASY_TEAM_SWAP_SUCCESS:
      return {
        ...state,
          loadingFantasyTeamSwapping: false,
      };
    case FANTASY_TEAM_SWAP_FAILED:
      return {
        ...state,
          loadingFantasyTeamSwapping: false,
      };
      /** Default State **/
      default:
        return {
          ...state
        };
  }
}

export default fantasyTeamReducer;
