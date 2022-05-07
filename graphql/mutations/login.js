import { gql } from "@apollo/client";

export default gql`
  mutation login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      id
      username
      profile {
        fantasyTeamId
      }
    }
  }
`;
