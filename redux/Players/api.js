// Packages
import { createApolloClient } from "graphql/apollo";

// Actions
import {
  getPlayersSuccess,
  getPlayersFailed
} from "./actionsCreators";

// GraphQL
import QUERY_PLAYERS from "graphql/queries/players";

// Utils
import {buildPlayers} from "utils/playersHelper";

export const getPlayers = (first, offset, where, sortBy) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: QUERY_PLAYERS,
        variables: { first, offset, where, sortBy },
      });
      if (result && result.data.players != null) {
        const playersData = buildPlayers(result.data.players.data)
       return dispatch(getPlayersSuccess([...playersData]))
      }
      dispatch(getPlayersFailed(result.data.errors[0].message))

    } catch (e) {
      dispatch(getPlayersFailed(e.message))
    }
  };
};
