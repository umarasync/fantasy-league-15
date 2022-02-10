import axios from "utils/axiosInstance";
import {
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILED,
  UPDATE_TEAM_TO_PROFILE_SUCCESS,
  UPDATE_TEAM_TO_PROFILE_FAILED,
  RESET_PAGE,
} from "./actions";

import { createApolloClient } from "graphql/apollo";
import GET_ALL_TEAMS from "graphql/queries/teams";
import ADD_FAV_TEAM from "graphql/mutations/addFavouriteTeam";

export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: GET_ALL_TEAMS,
        variables: {},
      });
      console.log(result);
      if (result && result.data.teams != null) {
        dispatch({
          type: GET_ALL_TEAMS_SUCCESS,
          loading: false,
          payload: result.data.teams.data,
        });
      } else {
        dispatch({
          type: GET_ALL_TEAMS_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: GET_ALL_TEAMS_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

export const addFavouriteTeam = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: ADD_FAV_TEAM,
        variables: {
          data: {
            profileId: data.profileId,
            accountId: data.accountId,
            favouriteTeamId: data.favouriteTeamId,
          },
        },
      });
      console.log(result);
      if (result && result.data.updateTeamToProfile != null) {
        //Store data for processing
        localStorage.setItem("user-team", JSON.stringify(data.favouriteTeamId));
        dispatch({
          type: UPDATE_TEAM_TO_PROFILE_SUCCESS,
          loading: false,
          payload: result.data.updateTeamToProfile.message,
        });
      } else {
        dispatch({
          type: UPDATE_TEAM_TO_PROFILE_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: UPDATE_TEAM_TO_PROFILE_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};
