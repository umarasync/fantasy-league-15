// Packages
import { createApolloClient } from "graphql/apollo";

// Action Creators
import {
  getMatchFixturesSuccess, getMatchFixturesFailed
} from "./actionCreators";

// GraphQL
import GET_MATCH_FIXTURES from "graphql/queries/matchFixtures";
// import GET_MATCH_FIXTURES_GAME_WEEKS from "graphql/queries/getMatchFixturesGameWeeks";
import {isEmpty, responseFailed, responseSuccess} from "utils/helpers";

// Constants
import {MatchesGameWeeks} from "constants/data/matchesGameWeeks";
import {ERROR_MSG} from "constants/universalConstants";

export const getMatchFixturesForGameWeek = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: GET_MATCH_FIXTURES,
        variables: {
          "gameweek": data.gameWeek
        },
      });

      if (result && !isEmpty(result.data.matchFixtures)) {
        let { matchFixtures } = result.data
        dispatch(getMatchFixturesSuccess(matchFixtures))
        return responseSuccess('', {matchesOnDates: matchFixtures})
      }
      dispatch(getMatchFixturesFailed(result.data.errors[0].message))
      return responseFailed(ERROR_MSG)
    } catch (e) {
      dispatch(getMatchFixturesFailed(e.message))
      return responseFailed(ERROR_MSG)
    }
  };
};

export const getAllMatchFixturesGameWeeks = () => {

  return async (dispatch) => {
    try {

      return MatchesGameWeeks

      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        // query: GET_MATCH_FIXTURES_GAME_WEEKS,
        query: '',
        variables: {},
      });

      if (result && !isEmpty(result.data.matchFixtures)) {
        let { data } = result.data.matchFixtures
        dispatch(getMatchFixturesSuccess(data))
        return responseSuccess('', data)
      }
      dispatch(getMatchFixturesFailed(result.data.errors[0].message))
      return responseFailed(ERROR_MSG)
    } catch (e) {
      dispatch(getMatchFixturesFailed(e.message))
      return responseFailed(ERROR_MSG)
    }
  };
}