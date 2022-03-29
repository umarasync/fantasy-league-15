import { gql } from "@apollo/client";

export default gql`
  mutation createFantasyTeam(
    $goalkeepers: [FantasyTeamPlayerInput!]!
    $defenders: [FantasyTeamPlayerInput!]!
    $midfielders: [FantasyTeamPlayerInput!]!
    $forwards: [FantasyTeamPlayerInput!]!
#    $name: String!
  ) {
    createFantasyTeam(
      goalkeepers: $goalkeepers
      defenders: $defenders
      midfielders: $midfielders
      forwards: $forwards
#      name: $name
    ) {
      id
    }
  }
`;
