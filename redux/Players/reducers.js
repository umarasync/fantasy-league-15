import {
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED,
  RESET_PAGE,
} from "./actionsCreators";

function playersReducer(
  state = {
    loading: false,
    playersData: null,
    getPlayersError: "",
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        playersData: action.payload,
      };
    case GET_PLAYERS_FAILED:
      return {
        ...state,
        loading: false,
        getPlayersError: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        playersData: null,
        getPlayersError: "",
      };
    default:
      return state;
  }
}

export default playersReducer;
