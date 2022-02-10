import {gql} from '@apollo/client'

export default gql`
  query me {
    me {
      id
      #fantasy leagues ++
      fantasyLeagues {
        id
        name
        type
        joinToken
        owner {
          id
          firstName
          lastName
        }
        members {
          id
          firstName
          lastName
        }
        team {
          id
          name
          logo
        }
      }
      #fantasy leagues --
    }
  }
`
