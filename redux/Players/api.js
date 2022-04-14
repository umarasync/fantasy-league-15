// Packages
import { createApolloClient } from "graphql/apollo";

// Actions
import {
  getPlayersSuccess,
  getPlayersFailed
} from "./actionsCreators";

// GraphQL
import QUERY_PLAYERS from "graphql/queries/players";
import QUERY_PLAYER from "graphql/queries/player";
import SET_FANTASY_TEAM_ROLE from "graphql/mutations/setFantasyTeamRole";

// Utils
import {buildPlayers} from "utils/playersHelper";
import {isEmpty, responseFailed, responseSuccess} from "utils/helpers";

// Constants
import {ERROR_MSG} from "constants/universalConstants";

export const getPlayers = (first, offset, where, sortBy) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: QUERY_PLAYERS,
        variables: { first, offset, where, sortBy },
      });

      if (result && !isEmpty(result.data.players)) {
        const playersData = buildPlayers(result.data.players.data)
       return dispatch(getPlayersSuccess({
         totalPlayers: result.data.players.totalCount,
         players: [...playersData]
       }))
      }
      dispatch(getPlayersFailed(result.data.errors[0].message))
    } catch (e) {
      dispatch(getPlayersFailed(e.message))
    }
  };
};

export const getPlayer = ({playerId}) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: QUERY_PLAYER,
        variables: { id: playerId },
      });
      if (result && !isEmpty(result.data.playerById)) {
        const playerData = buildPlayers([{...result.data.playerById}])
        return responseSuccess('', playerData[0])
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
    }
  };
};

export const setFantasyTeamRole = ({fantasyTeamId, captain, viceCaptain}) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: SET_FANTASY_TEAM_ROLE,
        variables: {
          fantasyTeamId,
          captain,
          viceCaptain
        },
      });
      if (result && !isEmpty(result.data.setFantasyTeamRoles)) {
        return responseSuccess('Role has been changed successfully !!!', result.data.setFantasyTeamRoles)
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
    }
  };
};