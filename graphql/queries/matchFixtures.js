import {gql} from '@apollo/client'

export default gql`
  query MatchFixture($gameweek: Int!) {
    matchFixtures(gameweek: $gameweek) {
      data {
        id
        homeTeam {
          id
          name
          logo
        }
        awayTeam {
          id
          name
          logo
        }
        matchTime
      }
    }
  }
`
