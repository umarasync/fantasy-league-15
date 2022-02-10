import { gql } from "@apollo/client";

export default gql`
  mutation updateTeamToProfile($data: UpdateTeamToProfileInput!) {
    updateTeamToProfile(data: $data) {
      code
      message
    }
  }
`;
