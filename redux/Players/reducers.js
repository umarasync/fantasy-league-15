import {
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED,
  // UPDATE_TEAM_TO_PROFILE_SUCCESS,
  // UPDATE_TEAM_TO_PROFILE_FAILED,
  RESET_PAGE,
} from "./actions";

function playersReducer(
  state = {
    loading: false,
    getPlayersSuccess: "",
    getPlayersError: "",
    // updateTeamToProfileSuccess:"",
    // updateTeamToProfileError:"",
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        getPlayersSuccess: action.payload,
      };
    case GET_PLAYERS_FAILED:
      return {
        ...state,
        loading: false,
        getPlayersError: action.payload,
      };
    // case UPDATE_TEAM_TO_PROFILE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     updateTeamToProfileSuccess: action.payload,
    //   };
    // case UPDATE_TEAM_TO_PROFILE_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     updateTeamToProfileError: action.payload,
    //   };
    case RESET_PAGE:
      return {
        loading: false,
        getPlayersSuccess: "",
        getPlayersError: "",
        // updateTeamToProfileSuccess:"",
        // updateTeamToProfileError:"",
      };
    default:
      return state;
  }
}

export default playersReducer;
