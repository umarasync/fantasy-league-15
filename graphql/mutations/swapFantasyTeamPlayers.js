import {gql} from '@apollo/client'

export default gql`
  mutation SwapFantasyTeamPlayers($captain: FantasyTeamPlayerIdInput!, $fantasyTeamId: String!, $substitutes: [FantasyTeamPlayerIdInput!]!, $viceCaptain: FantasyTeamPlayerIdInput!) {
    swapFantasyTeamPlayers(captain: $captain, fantasyTeamId: $fantasyTeamId, substitutes: $substitutes, viceCaptain: $viceCaptain) {
      id
    }
  }
`