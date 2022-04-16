import {gql} from '@apollo/client'

export default gql`
    query Gameweeks($seasonId: String!) {
      gameweeks(seasonId: $seasonId) {
        id
        gameweek
        deadline
        current
      }
    }
`
