import {gql} from '@apollo/client'

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      currentGameweek
      fantasyTeamId
      accounts {
        id
        username
      }
    }
  }
`
