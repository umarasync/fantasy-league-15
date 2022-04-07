import {gql} from '@apollo/client'

export default gql`
  query players(
    $first: Int!
    $offset: Int!
    $where: PlayersWhereInput!
    $sortBy: PlayersSortByInput!
  ) {
    players(_first: $first, _offset: $offset, where: $where, sortBy: $sortBy) {
      data  {
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
        currGWPoints {
          totalPoints
          assistPoints
          yellowCardPoints
          redCardPoints
          savesPoints
          penaltySavePoints
          missedPenaltyPoints
          ownGoalPoints
          playingTimePoints
          scoringPoints
          cleanSheetPoints
          goalsConcededPoints
          normal
          bonus
        }
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
      }
      hasNext
      totalCount
    }
  }
`
