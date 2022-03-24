// Packages
import {
    createFantasyTeamSuccess,
    createFantasyTeamFailed,
} from "./actionCreators";

// GraphQL
import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_TEAM from "graphql/mutations/createFantasyTeam";

// Constants
import {ERROR_MSG} from "constants/universal";

export const createFantasyTeam = (data) => {

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
          // name: variables.name,
        },
      });
      console.log("createFantasyTeam result =======", result);
      if (result && result.data.createFantasyTeam !== null) {
        localStorage.setItem("user-fantasy-team", JSON.stringify(result.data.createFantasyTeam));
        dispatch(createFantasyTeamSuccess(result.data.createFantasyTeam))
      }
      dispatch(createFantasyTeamFailed(ERROR_MSG))
    } catch (e) {
      dispatch(createFantasyTeamFailed(ERROR_MSG))
    }
  };
};
