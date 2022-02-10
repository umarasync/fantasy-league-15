import {gql} from '@apollo/client'

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      accounts {
        id
        username
      }
      # fantasy teams created by user
      fantasyTeams {
        id
        squad {
          id
          name
          matchName
          position
          photo
          score
          value
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
          pitchIndex
        }
        playing11 {
          id
          name
          matchName
          position
          photo
          score
          value
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
          playing11Index
        }
        substitutes {
          id
          name
          matchName
          position
          photo
          score
          value
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
          substituteIndex
        }
        captain {
          id
          playing11Index
        }
        viceCaptain {
          id
          playing11Index
        }
        overallPoints
        overallRank
        totalTeams
        gameweekPoints
      }
    }
  }
`
