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
      fullName
      freeTransfers
      fantasyTeamValue
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
