import {gql} from '@apollo/client'

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      currentGameweek
      fantasyTeamId
      totalScore
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
    }
  }
`
