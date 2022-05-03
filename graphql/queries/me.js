import { gql } from "@apollo/client";

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      currentGameweek
      fantasyTeamId
      currentSeason
      fantasyTeamValue
      fullName
      freeTransfers
      dob
      mobileNumber
      gender
      favouriteTeam {
        id
        name
      }
      accounts {
        id
        username
      }
      fantasyLeagues {
        id
        name
        type
        joinToken
        members {
          firstName
        }
        owner {
          firstName
        }
      }
    }
  }
`;
