import {gql} from '@apollo/client'

export default gql`
  mutation createFantasyLeague($input: FantasyLeagueInput) {
    createFantasyLeague(input: $input) {
      id
      name
      type
      createdAt
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
    }
  }
`
