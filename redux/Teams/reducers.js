import {
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILED,
  RESET_PAGE,
} from "./actions";

function teamsReducer(
  state = {
    loading: false,
    getAllTeamsSuccess: "",
    getAllTeamsError: "",
  },
  action
) {
  switch (action.type) {
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllTeamsSuccess: action.payload,
      };
    case GET_ALL_TEAMS_FAILED:
      return {
        ...state,
        loading: false,
        getAllTeamsError: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        getAllTeamsSuccess: "",
        getAllTeamsError: "",
      };
    default:
      return state;
  }
}

export default teamsReducer;
