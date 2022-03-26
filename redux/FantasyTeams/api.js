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

export const createFantasyTeam = (data) => {

  return

  console.log("createFantasyTeam Data=============", data)

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
      console.log("createFantasyTeam result =======", result);
      if (result && result.data.createFantasyTeam !== null) {
        localStorage.setItem("user-fantasy-team", JSON.stringify(result.data.createFantasyTeam));
        dispatch(createFantasyTeamSuccess(result.data.createFantasyTeam))
      }
      dispatch(createFantasyTeamFailed(ERROR_MSG))
    } catch (e) {
      console.log("createFantasyTeam error =======", e);
      dispatch(createFantasyTeamFailed(ERROR_MSG))
    }
  };
};
