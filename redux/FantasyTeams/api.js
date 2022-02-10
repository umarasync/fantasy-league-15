import axios from "utils/axiosInstance";
import {
  CREATE_FANTASY_TEAM_SUCCESS,
  CREATE_FANTASY_TEAM_ERROR,
  RESET_PAGE,
} from "./actions";

import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_TEAM from "graphql/mutations/createFantasyTeam";

export const createFantasyTeam = (variables) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: CREATE_FANTASY_TEAM,
        variables: {
          goalkeepers: variables.goalkeepers,
          defenders: variables.defenders,
          midfielders: variables.midfielders,
          forwards: variables.forwards,
          name: variables.name,
        },
      });
      console.log(result);
      if (result && result.data.createFantasyTeam != null) {
        //Store data for processing
        localStorage.setItem(
          "user-fantasy-team",
          JSON.stringify(result.data.createFantasyTeam)
        );
        dispatch({
          type: CREATE_FANTASY_TEAM_SUCCESS,
          loading: false,
          payload: result.data.createFantasyTeam,
        });
      } else {
        dispatch({
          type: CREATE_FANTASY_TEAM_ERROR,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: CREATE_FANTASY_TEAM_ERROR,
        loading: false,
        payload: e.message,
      });
    }
  };
};
