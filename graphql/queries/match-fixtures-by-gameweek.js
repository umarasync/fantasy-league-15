import {gql} from '@apollo/client'

export default gql`
  query matchFixtures($where: MatchFixturesWhereInput!) {
    matchFixtures(where: $where) {
      matchTime
      homeTeam {
        name
        logo
      }
      awayTeam {
        name
        logo
      }
    }
  }
`
