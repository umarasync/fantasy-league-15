import axios from "utils/axiosInstance";
import { GET_PLAYERS_SUCCESS, GET_PLAYERS_FAILED, RESET_PAGE } from "./actions";

import { createApolloClient } from "graphql/apollo";
import QUERY_PLAYERS from "graphql/queries/players";

export const getPlayers = (first, offset, where, sortBy) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: QUERY_PLAYERS,
        variables: { first, offset, where, sortBy },
      });
      console.log(result);
      if (result && result.data.players != null) {
        dispatch({
          type: GET_PLAYERS_SUCCESS,
          loading: false,
          payload: result.data.players.data,
        });
      } else {
        dispatch({
          type: GET_PLAYERS_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: GET_PLAYERS_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};
