// Packages
import { createApolloClient } from "graphql/apollo";

// Action Creators
import {
  getMatchFixturesSuccess, getMatchFixturesFailed
} from "./actionCreators";

// GraphQL
import GET_MATCH_FIXTURES from "graphql/queries/matchFixtures";
// import GET_MATCH_FIXTURES_GAME_WEEKS from "graphql/queries/getMatchFixturesGameWeeks";
import {isEmpty, responseSuccess} from "utils/helpers";

// Constants
import {MatchesGameWeeks} from "constants/data/matchesGameWeeks";


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
        let { data } = result.data.matchFixtures
        dispatch(getMatchFixturesSuccess(data))
        return responseSuccess('', data)
      }

      dispatch(getMatchFixturesFailed(result.data.errors[0].message))

    } catch (e) {
      dispatch(getMatchFixturesFailed(e.message))
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

    } catch (e) {
      dispatch(getMatchFixturesFailed(e.message))
    }
  };
}