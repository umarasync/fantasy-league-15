import { gql } from "@apollo/client";

export default gql`
  mutation updatePassword($data: UpdatePasswordInput!) {
    updatePassword(type: EMAIL, data: $data) {
      id
      username
      __typename
    }
  }
`;
