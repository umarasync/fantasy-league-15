import { gql } from "@apollo/client";

export default gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      profile {
        id
        dob
        fullName
        gender
        fantasyTeams {
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
              __typename
            }
            pitchIndex
            __typename
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
              __typename
            }
            playing11Index
            __typename
          }
          substitutes {
            id
            matchName
            name
            position
            value
            team {
              id
              name
              logo
              homeKit
              goalkeeperKit
              __typename
            }
            substituteIndex
            __typename
          }
          captain {
            id
            playing11Index
            __typename
          }
          viceCaptain {
            id
            playing11Index
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
