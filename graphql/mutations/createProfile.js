import { gql } from "@apollo/client";

export default gql`
  mutation createProfile($data: CreateProfileInput!) {
    createProfile(data: $data) {
      id
      fullName
      accounts {
        id
        username
        __typename
      }
      __typename
    }
  }
`;
