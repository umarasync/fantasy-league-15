import {gql} from '@apollo/client'

export default gql`
  mutation updateFantasyTeam(
    $fantasyTeamId: String!
    $playing11: [FantasyTeamPlayerInput!]!
    $substitutes: [FantasyTeamPlayerInput!]!
  ) {
    updateFantasyTeam(
      fantasyTeamId: $fantasyTeamId
      playing11: $playing11
      substitutes: $substitutes
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
