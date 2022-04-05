import {gql} from '@apollo/client'

export default gql`
  mutation SetFantasyTeamRole($fantasyTeamId: String!, $player: FantasyTeamPlayerInput!, $role: PlayerRole!) {
    setFantasyTeamRole(fantasyTeamId: $fantasyTeamId, player: $player, role: $role) {
      id
    }
  }
`
