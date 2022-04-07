// GraphQL
import { createApolloClient } from "graphql/apollo";
import CREATE_FANTASY_TEAM from "graphql/mutations/createFantasyTeam";
import DO_FANTASY_TEAM_TRANSFER from "graphql/mutations/doFantasyTeamTransfers";
import GET_FANTASY_TEAM from "graphql/queries/fantasyTeamById";

// Constants
import {ERROR_MSG} from "constants/universalConstants";

// Utils
import {isEmpty, responseFailed, responseSuccess} from "utils/helpers";
import {buildPlayers} from "utils/playersHelper";

// Actions
import {fantasyTeamCreationStart, fantasyTeamTransferStart} from "./actionCreators";

export const createFantasyTeam = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fantasyTeamCreationStart())
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

export const getFantasyTeamById = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: GET_FANTASY_TEAM,
        variables: {
          "gameweek": data.gameWeek,
          "fantasyTeamId": data.fantasyTeamId
        },
      });

      if (result && result.data.fantasyTeamById !== null) {
        return buildPlayers(result.data.fantasyTeamById.squad)
      }
      return false
    } catch (e) {
      return false
    }
  };
};

export const doFantasyTeamTransfers = (data) => {
  const { fantasyTeamId, transfers } = data

  return async (dispatch) => {
    try {
      dispatch(fantasyTeamTransferStart())
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: DO_FANTASY_TEAM_TRANSFER,
        variables: {
          fantasyTeamId,
          transfers
        },
      });

      if (result && !isEmpty(result.data.transferPlayers)) {
        return responseSuccess('Transfer Successful Redirecting!!!', result.data.transferPlayers)
      }
      return responseFailed(ERROR_MSG)
    } catch (e) {
      return responseFailed(ERROR_MSG)
    }
  };
};

