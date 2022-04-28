// GraphQL
import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_LEAGUE from "graphql/mutations/createFantasyLeague";

// Constants
import { ERROR_MSG } from "constants/universalConstants";

// Utils
import { isEmpty, responseFailed, responseSuccess } from "utils/helpers";

// Actions
import {
  fantasyLeagueCreationFailed,
  fantasyLeagueCreationSuccess,
} from "./actionCreators";

export const createFantasyLeague = ({ name }) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: CREATE_FANTASY_LEAGUE,
        variables: {
          input: {
            name,
          },
        },
      });

      if (result && !isEmpty(result.data.createFantasyLeague)) {
        dispatch(fantasyLeagueCreationSuccess());
        return responseSuccess(
          "Fantasy League created successfully !!!",
          result.data.createFantasyLeague
        );
      }
      dispatch(fantasyLeagueCreationFailed());
      return responseFailed(ERROR_MSG);
    } catch (e) {
      dispatch(fantasyLeagueCreationFailed());
      return responseFailed(ERROR_MSG);
    }
  };
};
