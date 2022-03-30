import {
  GET_MATCH_FIXTURES_SUCCESS,
  GET_MATCH_FIXTURES_FAILED,
} from "./actionCreators";

function teamsReducer(
  state = {
    matchFixtures: null,
  },
  action
) {
  switch (action.type) {
    case GET_MATCH_FIXTURES_SUCCESS:
      return {
        ...state,
        matchFixtures: action.payload,
      };
    case GET_MATCH_FIXTURES_FAILED:
      return {
        ...state,
        matchFixtures: null,
      };
    default:
      return state;
  }
}

export default teamsReducer;
