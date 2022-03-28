// Packages
import { createApolloClient } from "graphql/apollo";

// Action Creators
import {
  getMatchFixturesSuccess, getMatchFixturesFailed
} from "./actionCreators";

// GraphQL
import GET_MATCH_FIXTURES from "graphql/queries/matchFixtures";
import {isEmpty} from "utils/helpers";


export const getMatchFixtures = (data) => {
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
        console.log('getMatchFixturesSuccess ========', result)

        return dispatch(getMatchFixturesSuccess(result.data.matchFixtures.data))
      }

      dispatch(getMatchFixturesFailed(result.data.errors[0].message))

    } catch (e) {
      dispatch(getMatchFixturesFailed(e.message))
    }
  };
};