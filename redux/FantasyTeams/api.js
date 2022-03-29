// Packages
import {
    createFantasyTeamSuccess,
    createFantasyTeamFailed,
} from "./actionCreators";

// GraphQL
import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_TEAM from "graphql/mutations/createFantasyTeam";

// Constants
import {ERROR_MSG} from "constants/universalConstants";

// Utils
import {responseFailed, responseSuccess} from "utils/helpers";

export const createFantasyTeam = (data) => {

  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: CREATE_FANTASY_TEAM,
        variables: {
          goalkeepers: data.goalkeepers,
          defenders: data.defenders,
          midfielders: data.midfielders,
          forwards: data.forwards,
          name: data.name,
        },
      });

      if (result && result.data.createFantasyTeam !== null) {
        return responseSuccess('Fantasy Team Created Successfully!', result.data.createFantasyTeam)
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
    }
  };
};
