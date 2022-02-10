import {gql} from '@apollo/client'

export default gql`
  query profile($id: ID!) {
    profile(id: $id) {
      id
      firstName
      lastName
      accounts {
        id
        username
      }
      fantasyTeams {
        id
        name
        players {
          id
          name
          position
          value
          team {
            id
            name
          }
        }
      }
    }
  }
`
