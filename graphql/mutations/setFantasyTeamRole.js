import {gql} from '@apollo/client'

export default gql`
  mutation setFantasyTeamRole(
    $fantasyTeamId: String!
    $role: PlayerRole
    $player: FantasyTeamPlayerInput
  ) {
    setFantasyTeamRole(
      fantasyTeamId: $fantasyTeamId
      role: $role
      player: $player
    ) {
      id
      captain {
        id
        playing11Index
      }
      viceCaptain {
        id
        playing11Index
      }
    }
  }
`
