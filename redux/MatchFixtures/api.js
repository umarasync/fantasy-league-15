// Packages
import { createApolloClient } from "graphql/apollo";

// Action Creators
import {
  getMatchFixturesSuccess, getMatchFixturesFailed
} from "./actionCreators";

// GraphQL
import GET_MATCH_FIXTURES from "graphql/queries/matchFixtures";

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

      // if (result && result.data.teams !== null) {
      //   return dispatch(getAllTeamsSuccess(result.data.teams.data))
      // }

      console.log('getAllTeamsSuccess ==========', result)

      // dispatch(getMatchFixturesFailed(result.data.errors[0].message))
    } catch (e) {
      console.log('getMatchFixturesFailed ==========', e)
      dispatch(getMatchFixturesFailed(e.message))
    }
  };
};

