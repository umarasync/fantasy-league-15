import {gql} from '@apollo/client'

export default gql`
  mutation joinFantasyLeague($id: String!, $token: String!) {
    joinFantasyLeague(id: $id, token: $token) {
      id
      name
    }
  }
`
