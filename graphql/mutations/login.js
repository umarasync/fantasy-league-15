import { gql } from "@apollo/client";

export default gql`
  mutation login($loginPassword2: String!, $loginUsername2: String!) {
    login(password: $loginPassword2, username: $loginUsername2) {
      id
      username
      profile {
        fantasyTeamId
      }
    }
  }
`;
