import {gql} from '@apollo/client'

export default gql`
  mutation SetFantasyTeamBooster($fantasyTeamId: String!, $gameweek: Int!, $type: FantasyTeamBoosterType!) {
    setFantasyTeamBooster(fantasyTeamId: $fantasyTeamId, gameweek: $gameweek, type: $type) {
      id
    }
  }
`
