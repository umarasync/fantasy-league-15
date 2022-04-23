import { gql } from "@apollo/client";

export default gql`
  mutation CreateFantasyLeague($input: FantasyLeagueInput) {
    createFantasyLeague(input: $input) {
      id
      joinToken
      name
      members {
        fullName
      }
      owner {
        fullName
      }
      type
    }
  }
`;
