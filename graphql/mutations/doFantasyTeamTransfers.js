import {gql} from '@apollo/client'

export default gql`
  mutation TransferPlayers($fantasyTeamId: ID!, $transfers: [TransferInput!]!) {
    transferPlayers(fantasyTeamId: $fantasyTeamId, transfers: $transfers) {
      squad {
        id
        matchName
      }
    }
  }
`
