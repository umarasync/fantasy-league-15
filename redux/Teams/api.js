// Packages
import { createApolloClient } from "graphql/apollo";

// Action Creators
import {
  getAllTeamsSuccess, getAllTeamsFailed, updateTeamToProfileSuccess
} from "./actionCreators";

// GraphQL
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
      if (result && result.data.teams != null) {
        return dispatch(getAllTeamsSuccess(result.data.teams.data))
      }
      dispatch(getAllTeamsFailed(result.data.errors[0].message))
    } catch (e) {
      dispatch(getAllTeamsFailed(e.message))
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

      console.log("addFavouriteTeam: ========", result);
      if (result && result.data.updateTeamToProfile !== null) {
        localStorage.setItem("user-team", JSON.stringify(data.favouriteTeamId));
        return dispatch(updateTeamToProfileSuccess(result.data.updateTeamToProfile.message))
      }
      dispatch(updateTeamToProfileSuccess(result.data.errors[0].message))

    } catch (e) {
      dispatch(updateTeamToProfileSuccess(e.message))
    }
  };
};
