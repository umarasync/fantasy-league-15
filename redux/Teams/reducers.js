import {
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILED,
  UPDATE_TEAM_TO_PROFILE_SUCCESS,
  UPDATE_TEAM_TO_PROFILE_FAILED,
  RESET_PAGE,
} from "./actionCreators";

function teamsReducer(
  state = {
    loading: false,
    allTeams: null,
    getAllTeamsError: "",
    updateTeamToProfileSuccess:"",
    updateTeamToProfileError:"",
  },
  action
) {
  switch (action.type) {
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        allTeams: action.payload,
      };
    case GET_ALL_TEAMS_FAILED:
      return {
        ...state,
        loading: false,
        getAllTeamsError: action.payload,
      };
    case UPDATE_TEAM_TO_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateTeamToProfileSuccess: action.payload,
      };
    case UPDATE_TEAM_TO_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        updateTeamToProfileError: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        allTeams: null,
        getAllTeamsError: "",
        updateTeamToProfileSuccess:"",
        updateTeamToProfileError:"",
      };
    default:
      return state;
  }
}

export default teamsReducer;
