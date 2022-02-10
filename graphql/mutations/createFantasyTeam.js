import { gql } from "@apollo/client";

export default gql`
  mutation createFantasyTeam(
    $goalkeepers: [FantasyTeamPlayerInput!]!
    $defenders: [FantasyTeamPlayerInput!]!
    $midfielders: [FantasyTeamPlayerInput!]!
    $forwards: [FantasyTeamPlayerInput!]!
    $name: String!
  ) {
    createFantasyTeam(
      goalkeepers: $goalkeepers
      defenders: $defenders
      midfielders: $midfielders
      forwards: $forwards
      name: $name
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
`;
