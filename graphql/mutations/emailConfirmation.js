import { gql } from "@apollo/client";

export default gql`
  mutation confirmAccount($data: ActivateAccountInput!) {
    confirmAccount(type: EMAIL, data: $data) {
      id
      username
      __typename
    }
  }
`;
