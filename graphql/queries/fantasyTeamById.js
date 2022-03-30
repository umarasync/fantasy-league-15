import {gql} from '@apollo/client'

export default gql`
  query FantasyTeamById($gameweek: Int!, $fantasyTeamId: String!) {
    fantasyTeamById(gameweek: $gameweek, id: $fantasyTeamId) {
      id
      squad {
        id
        name
        matchName
        position
        photo
        score
        value
        totalPoints
        captain
        viceCaptain
        isSubstitute
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
        pitchIndex
      }
    }
  }
`
