import {
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED,
  RESET_PAGE,
} from "./actionsCreators";

function playersReducer(
  state = {
    playersData: null,
  },
  action
) {
  switch (action.type) {
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        playersData: action.payload,
      };
    case GET_PLAYERS_FAILED:
      return {
        ...state,
      };
    case RESET_PAGE:
      return {
        playersData: null,
      };
    default:
      return state;
  }
}

export default playersReducer;
