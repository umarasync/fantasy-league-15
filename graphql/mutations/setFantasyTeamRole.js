import {gql} from '@apollo/client'

export default gql`
  mutation SetFantasyTeamRoles($captain: FantasyTeamPlayerIdInput!, $fantasyTeamId: String!, $viceCaptain: FantasyTeamPlayerIdInput!) {
    setFantasyTeamRoles(captain: $captain, fantasyTeamId: $fantasyTeamId, viceCaptain: $viceCaptain) {
      id
    }
  }
`
