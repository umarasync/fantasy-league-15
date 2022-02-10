import {gql} from '@apollo/client'

export default gql`
  mutation swapFantasyTeamPlayers(
    $fantasyTeamId: String!
    $src: FantasyTeamPlayerInput!
    $dest: FantasyTeamPlayerInput!
  ) {
    swapFantasyTeamPlayers(
      fantasyTeamId: $fantasyTeamId
      src: $src
      dest: $dest
    ) {
      id
      squad {
        id
        name
        matchName
        position
        photo
        score
        value
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
        pitchIndex
      }
      playing11 {
        id
        name
        matchName
        position
        photo
        score
        value
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
        playing11Index
      }
      substitutes {
        id
        name
        matchName
        position
        photo
        score
        value
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
        substituteIndex
      }
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
