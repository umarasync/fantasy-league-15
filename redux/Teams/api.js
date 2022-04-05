// Packages
import { createApolloClient } from "graphql/apollo";

// GraphQL
import GET_ALL_TEAMS from "graphql/queries/teams";
import ADD_FAV_TEAM from "graphql/mutations/addFavouriteTeam";

// Utils
import {isEmpty, responseFailed, responseSuccess} from "utils/helpers";

// Constants
import {ERROR_MSG} from "constants/universalConstants";

export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: GET_ALL_TEAMS,
        variables: {},
      });

      if (result && !isEmpty(result.data.teams.data)) {
        return responseSuccess('', result.data.teams.data)
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
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
      if (result && !isEmpty(result.data.updateTeamToProfile)) {
        return responseSuccess('', result.data.updateTeamToProfile)
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
    }
  };
};
