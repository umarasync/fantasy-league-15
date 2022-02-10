import { gql } from "@apollo/client";

export default gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(type: EMAIL, data: $data) {
      id
      username
      __typename
    }
  }
`;
